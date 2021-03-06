## Course extractor
import getpodia/config

from std/uri import parseUri, `/`, `$`, Uri
from std/strtabs import `[]`
from std/strformat import fmt
from std/strutils import strip, find, parseInt, split, contains
from std/json import parseJson, `{}`, getStr, getInt, `$`, items
from std/tables import Table, `[]`, `[]=`, hasKey
from std/httpclient import newHttpClient, close, getContent, HttpClient,
                           newHttpHeaders
from std/htmlparser import parseHtml
from std/xmltree import findAll, attrs, innerText, XmlNode, items, attr
export tables.`[]`

import pkg/findxml/findAll

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
    filename*: string
    medias*: Table[string, VideoMediaMeta] ## type => media
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
  result = parts[3]
proc getCode*(url: string): string =
  ## Get the course code (url identification) from url string
  getCode parseUri url

proc extractCourse*(client; url: string): Course =
  ## Extracts all data from all videos from course
  let
    parsedUrl = url.parseUri
    urlBase = parsedUrl.getBaseUrl
    html = parseHtml client.getContent url
  for lect in html.findAll("li", {"class": "list-group list-group-menu list-group-xs mb-6"}):
    var lecture: CourseLecture
    lecture.name = lect.findAll("h2", {"class": "h4 text-md mb-2"})[0].innerText.strip
    for vidEl in lect.findAll("a", {"class": "list-group-item list-group-item-action"}):
      var video: CourseVideo
      # video.pageUrl = $(urlBase / vidEl.attrs["href"])
      video.pageUrl = vidEl.attrs["href"]
      video.name = vidEl.innerText.strip
      lecture.videos.add video
    result.lectures.add lecture
  result.name = html.findAll("h1", {"class": "h4"})[0].innerText.strip
  block description:
    let descEl = html.findAll("div", {"class": "mt5 text-xs"})
    if descEl.len == 0:
      break
    result.description = descEl[0].innerText.strip
  result.image = html.findAll("a", {"class": "thumb thumb-lg thumb-photo thumb-link"})[0].attrs["style"][22..^3]
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
  self.name = html.findAll("h1", {"class": "pr-md-6 d-md-block d-none"})[0].innerText.strip
  block videoCode:
    var startI = body.findText("_wq.push({") - 1
    var json = body[startI..^1]
    var endI = json.find("});") + 1
    json = json[0..<endI]

    startI = json.findText "id: \""
    self.code = json[startI..^1]
    endI = self.code.find("\"") - 1
    self.code = self.code[0..endI]
  # block comments:
  #   proc getCommentData(node: XmlNode): VideoComment =
  #     new result
  #     echo node
  #     result.avatar = node.findAll("div", {"class": "avatar avatar-xs"})[0].attrs["style"][22..^3]
  #     result.author = node.findAll("a", {"class": "font-weight-bold text-sm text-grey-dark my-1"})[0].innerText.strip
  #     # result.body = node.findAll([
  #     #   ("div", @{"class": "col-sm-12"}),
  #     #   ("div", @{"class": "ml2 text-xs"})
  #     # ])[0].innerText.strip
  #     result.body = node.findAll("div", {"class": "text-longform mb-3"})[0].innerText.strip
  #     result.creation = node.findAll("span", {"class": "text-muted text-sm my-1"})[0].attrs["data-title"]
  #     let likes = node.findAll("a", {"class": "btn btn-icon btn-transparent-soft btn-xs btn-rounded btn-tight"})[0].innerText.strip
  #     if likes.len > 7:
  #       result.likes = likes[7..^1].parseInt
  #   proc getNested(comment: VideoComment; commentNode: XmlNode) =
  #     for tdiv in commentNode.findAll("div"):
  #       if "replies" in tdiv.attr "id":
  #         for nest in tdiv:
  #           comment.nested.add nest.getCommentData

  #   for com in html.findAll("div", {"data-controller": "podia--comments--comment--form-component"}):
  #     let comment = com.getCommentData
  #     comment.getNested com
  #     self.comments.add comment

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
  self.meta.filename = json{"name"}.getStr
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

func getMedia(meta: VideoMeta; name: string): VideoMediaMeta =
  ## Video thumbnail
  if meta.medias.hasKey name:
    result = meta.medias[name]
func thumbnail*(meta: VideoMeta): VideoMediaMeta {.inline.} =
  ## Video thumbnail
  meta.getMedia "still_image"
func hdVideo*(meta: VideoMeta): VideoMediaMeta {.inline.} =
  ## Video HD source
  meta.getMedia "hd_mp4_video"

when isMainModule:
  from std/tables import pairs
  from std/json import `%*`, pretty
  import std/jsonutils
  when false:
    var video = CourseVideo(
      pageUrl: "http://localhost:5555/.test/videos/A%20Doa%C3%A7%C3%A3o%20de%20sua%20Hist%C3%B3ria.html" # Some downloaded Podia video page
    )
    newHttpClient().update video
    # video.getMeta
    echo video
    for name, m in video.meta.medias:
      echo name, %*m
    echo "---"
    echo video.meta.thumbnail
    echo video.meta.hdVideo
    echo "---"
    echo pretty video.comments.toJson
    # for comment in video.comments:
    #   echo comment[]
    #   for comment in comment.nested:
    #     echo "  ", comment[]
    #     for comment in comment.nested:
    #       echo "    ", comment[]
  else:
    let course = newHttpClient().extractCourse "http://localhost:5555/.test/courses/A%20Arte%20da%20Comunica%C3%A7%C3%A3o_%20Storytelling%20para%20Amizades%20e%20Neg%C3%B3cios.html"
    echo pretty course.toJson
