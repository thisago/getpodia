## Course extractor
import downpodia/base

from std/uri import parseUri, `/`, `$`, Uri
# from std/xmltree import attrs
from std/strtabs import `[]`
from std/strformat import fmt
from std/strutils import strip, find, parseInt, split
from std/json import parseJson, `{}`, getStr, getInt, `$`, items
from std/tables import Table, `[]`, `[]=`
export tables.`[]`

type
  Course* = object
    name*, image*, description*, code*: string
    lectures*: seq[CourseLecture]
  CourseLecture* = object
    name*: string
    videos*: seq[CourseVideo]
  CourseVideo* = object
    name*, pageUrl*, code*: string
    comments*: seq[VideoComment]
    meta*: VideoMeta
  VideoComment* = ref VideoCommentObj
  VideoCommentObj = object
    author*, body*, creation*, avatar*: string
    likes*: int
    nested*: seq[VideoComment]
  VideoSource* = distinct string

  VideoMeta* = object
    medias*: Table[string, VideoMediaMeta] ## type => media
    name*: string
  VideoMediaMeta* = object
    slug*, url*: string ## type
    width*, height*: int
    size*: int64 ## bytes
    createdAt*: int64 # unix time

using
  client: HttpClient

proc getBaseUrl(url: Uri): Uri =
  fmt"{url.scheme}://{url.hostname}:{url.port}".parseUri

proc getCode(url: Uri): string =
  ## Get the course code (url identification) from Uri instance
  let parts = url.path.split "/"
  result = parts[2]
proc getCode*(url: string): string =
  ## Get the course code (url identification) from url string
  getCode parseUri url

proc extractCourse*(client; url: string): Course =
  ## Extracts all data from all videos from course
  let
    parsedUrl = url.parseUri
    urlBase = parsedUrl.getBaseUrl
    html = parseHtml client.getContent url
  for lect in html.findAll("div", {"class": "panel panel-default panel-lg mv7"}):
    var lecture: CourseLecture
    for vidEl in lect.findAll("div", {"class": "row v-center text-center-xs"}):
      var video: CourseVideo
      video.pageUrl = $(urlBase / vidEl.findAll("a")[0].attrs["href"])
      video.name = vidEl.findAll("div", {"class": "col-sm-6 text-xs"})[0].innerText.strip
      lecture.videos.add video
    lecture.name = lect.findAll("div", {"class": "panel-heading text-center-xs"})[0].innerText.strip
    result.lectures.add lecture
  result.name = html.findAll("h1", {"class": "ma0"})[0].innerText.strip
  block description:
    let descEl = html.findAll("div", {"class": "mt5 text-xs"})
    if descEl.len == 0:
      break
    result.description = descEl[0].innerText.strip
  result.image = html.findAll("img", {"class": "img-responsive img-rounded center-block mb7"})[0].attrs["src"]
  result.code = url.getCode


proc findText(body, t: string): int =
  result = body.find(t) + t.len
  if result < 0:
    result = 0

proc update*(client; self: var CourseVideo) =
  ## Updates the video data by making a GET request to `self.url`
  let
    body = client.getContent self.pageUrl
    html = parseHtml body
  self.name = html.findAll("h1", {"class": "ma0"})[0].innerText.strip
  block videoCode:
    let startI = body.findText "_wq.push({\n    id: \""
    var code = body[startI..^1]
    let endI = code.find "\""
    code = code[0..<endI]
    self.code = code
  block comments:
    proc getCommentData(node: XmlNode): VideoComment =
      new result
      result.avatar = node.findAll("img")[0].attrs["src"]
      result.author = node.findAll("span", {"class": "text-w-700 text-darkest text-xs"})[0].innerText.strip
      result.body = node.findAll([
        ("div", @{"class": "col-sm-12"}),
        ("div", @{"class": "ml2 text-xs"})
      ])[0].innerText.strip
      result.creation = node.findAll("time")[0].attrs["datetime"]
      result.likes = node.findAll("span", {"data-target": "likes.count"})[0].innerText.strip.parseInt
    proc getNested(comment: VideoComment; commentNode: XmlNode) =
      for nest in commentNode.findAll("div", {"class": "comment ml4 nested-comment pl4 pv4"}):
        comment.nested.add nest.getCommentData

    for com in html.findAll("div", {"class": "comment pv4"}):
      let comment = com.getCommentData
      comment.getNested com
      self.comments.add comment

proc url*(self: CourseVideo): VideoSource =
  VideoSource("https://fast.wistia.net/embed/iframe/" & self.code)

proc getMeta*(self: var CourseVideo) =
  ## Extract video details from `VideoSource`
  var client = newHttpClient()
  client.headers = newHttpHeaders({
    "User-Agent": userAgent
  })
  let body = client.getContent self.url.string

  let startI = body.findText "W.iframeInit("
  var jsonData = body[startI..^1]
  let endI = jsonData.find ", {});"
  jsonData = jsonData[0..<endI]
  let json = parseJson jsonData
  self.meta.name = json{"name"}.getStr
  for asset in json{"assets"}:
    var media = VideoMediaMeta(
      slug: asset{"slug"}.getStr,
      url: asset{"url"}.getStr,
      width: asset{"width"}.getInt,
      height: asset{"height"}.getInt,
      size: asset{"size"}.getInt,
      createdAt: asset{"created_at"}.getInt
    )
    self.meta.medias[asset{"type"}.getStr] = media

func thumbnail*(meta: VideoMeta): VideoMediaMeta =
  ## Video thumbnail
  meta.medias["still_image"]
func hdVideo*(meta: VideoMeta): VideoMediaMeta =
  ## Video HD source
  meta.medias["hd_mp4_video"]

when isMainModule:
  from std/tables import pairs
  from std/json import `%*`
  var video = CourseVideo(
    pageUrl: "" # Some downloaded Podia video page
  )
  newHttpClient().update video
  video.getMeta
  echo video
  for name, m in video.meta.medias:
    echo name, %*m
  echo "---"
  echo video.meta.thumbnail
  echo video.meta.hdVideo
  echo "---"
  for comment in video.comments:
    echo comment[]
    for comment in comment.nested:
      echo "  ", comment[]
      for comment in comment.nested:
        echo "    ", comment[]
