## Course extractor

{.experimental: "codeReordering".}

import downpodia/base

from std/uri import parseUri, `/`, `$`, Uri
from std/xmltree import attrs
from std/strtabs import `[]`
from std/strformat import fmt
from std/strutils import strip, find, parseInt
from std/json import parseJson, `{}`, getStr, getInt, `$`

type
  Course* = object
    name*, image*, description*: string
    lectures*: seq[CourseLecture]
  CourseLecture* = object
    name*: string
    videos*: seq[CourseVideo]
  CourseVideo* = object
    name*, pageUrl*, code*: string
    comments*: seq[VideoComment]
    meta*: VideoMeta
  VideoComment* = object
    author*, body*, creation*,
      avatar*: string
    likes*: int
  VideoSource* = distinct string

  VideoMeta* = object
    filename*, url*: string
    width*, height*: int
    size*: int64 ## bytes
    bitrate*: int
    createdAt*: int64 # unix time

using
  client: HttpClient

proc getBaseUrl(url: string): Uri =
  let u = url.parseUri
  result = fmt"{u.scheme}://{u.hostname}:{u.port}".parseUri

proc extractCourse*(client; url: string): Course =
  ## Extracts all data from all videos from course
  let
    urlBase = url.getBaseUrl
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
    for com in html.findAll("div", {"class": "comment pv4"}):
      var comment: VideoComment
      comment.avatar = com.findAll("img")[0].attrs["src"]
      comment.author = com.findAll("span", {"class": "text-w-700 text-darkest text-xs"})[0].innerText.strip
      comment.body = com.findAll([
        ("div", @{"class": "comment-body"}),
        ("div", @{"class": "ml2 text-xs"})
      ])[0].innerText.strip
      comment.creation = com.findAll("time")[0].attrs["datetime"]
      comment.likes = com.findAll("span", {"data-target": "likes.count"})[0].innerText.strip.parseInt

      self.comments.add comment

proc url*(self: CourseVideo): VideoSource =
  VideoSource("https://fast.wistia.net/embed/iframe/" & self.code)

proc getMeta*(self: var CourseVideo) =
  ## Extract video details from `VideoSource`
  var client = newHttpClient()
  client.headers = newHttpHeaders({
    "User-Agent": userAgent
  })
  let
    body = client.getContent self.url.string
    html = parseHtml body

  let startI = body.findText "W.iframeInit("
  var jsonData = body[startI..^1]
  let endI = jsonData.find ", {});"
  jsonData = jsonData[0..<endI]
  let
    json = parseJson jsonData
    vid = json{"assets"}{0}
  self.meta.url = vid{"url"}.getStr
  self.meta.height = vid{"height"}.getInt
  self.meta.width = vid{"width"}.getInt
  self.meta.bitrate = vid{"bitrate"}.getInt
  self.meta.size = vid{"size"}.getInt
  self.meta.createdAt = vid{"created_at"}.getInt
  self.meta.filename = html.findAll("title")[0].innerText.strip

when isMainModule:
  var video = CourseVideo(
    pageUrl: "http://localhost:5555/.test/courses/videos/perfeccionismo.html"
  )
  newHttpClient().update video
  # video.getMeta
  echo video
