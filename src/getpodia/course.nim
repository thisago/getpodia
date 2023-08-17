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
import pkg/scraper

from pkg/util/forStr import between

type
  Course* = object
    name*, image*, description*, code*: string
    lectures*: seq[CourseLecture]
  CourseLecture* = object
    name*: string
    videos*: seq[CourseVideo]
  CourseVideo* = object
    name*, pageUrl*, code*, fileUrl*: string
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
    cardBody = html.findAll("ol", {"class": "sticky-contents pl-0 list-unstyled"})[0]

  for lect in cardBody.findAll("li", {"class": "list-group list-group-menu list-group-xs mb-6"}):
    var lecture: CourseLecture
    lecture.name = lect.findAll([
      ("nav", @{"class": ""}),
      ("h2", @{"": ""}),
    ]).text.strip
    for vidEl in lect.findAll("a", {"class": "list-group-item list-group-item-action"}):
      var video: CourseVideo
      video.pageUrl = $(urlBase / vidEl.attrs["href"])
      # video.pageUrl = vidEl.attrs["href"]
      video.name = vidEl.innerText.strip
      lecture.videos.add video
    result.lectures.add lecture
  result.name = html.findAll("h1", {"class": "h4"}).text.strip
  block description:
    let descEl = html.findAll("div", {"class": "text-muted text-lg mt-n4 spacer-section"})
    if descEl.len == 0:
      break
    result.description = descEl.text.strip
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
  self.name = html.findAll("h1", {"class": "pr-md-6 d-md-block d-none"}).text.strip
  block videoCode:
    self.code = body.between("_wq.push({", "});").between("id: \"", "\"")
    if self.code.len == 0:
      self.fileUrl = html.findAll([
        ("div", @{"id": "lesson-content"}),
        ("a", @{"class": "list-group-item list-group-item-action"})
      ]).attr "href"
      if "podia.com" notin self.fileUrl:
        var link = parseUri self.pageUrl
        link.path = self.fileUrl
        self.fileUrl = $link
  block comments:
    proc getCommentData(node: XmlNode): VideoComment =
      new result
      result.avatar = node.findAll("div", {"class": "avatar avatar-xs"})[0].attrs["style"][22..^3]
      result.author = node.findAll("a", {"class": "font-weight-bold text-sm text-grey-dark my-1"}).text.strip
      result.body = node.findAll("div", {"class": "text-longform mb-3"}).text.strip
      result.creation = node.findAll("span", {"class": "text-muted text-sm my-1"})[0].attrs["data-title"]
      let likes = node.findAll("a", {"class": "btn btn-xs btn-transparent-soft btn-rounded btn-tight btn-icon"}).text.strip
      if likes.len > 7:
        result.likes = likes[7..^1].parseInt
    proc getNested(comment: VideoComment; commentNode: XmlNode) =
      for tdiv in commentNode.findAll("div"):
        if "replies" in tdiv.attr "id":
          for nest in tdiv:
            try:
              comment.nested.add nest.getCommentData
            except: discard
              
    # for com in html.findAll("div", {"data-controller": "podia--comments--comment--form-component"}):
    #   if com.attr("id") == "comments":
    #     continue
    #   let comment = com.getCommentData
    #   comment.getNested com
    #   self.comments.add comment

proc url*(self: CourseVideo): VideoSource =
  VideoSource("https://fast.wistia.net/embed/iframe/" & self.code)

proc getMeta*(self: var CourseVideo) =
  ## Extract video details from `VideoSource`
  var client = newHttpClient()
  client.headers = newHttpHeaders({
    "User-Agent": userAgent
  })
  let body = client.getContent self.url.string

  var jsonData = body.between("W.iframeInit(", ", {});")
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
  result = meta.getMedia "hd_mp4_video"
  if result.url.len == 0:
    result = meta.getMedia "md_mp4_video"

when isMainModule:
  from std/tables import pairs
  from std/json import `%*`, pretty, to
  import std/jsonutils
  when not true:
    var video = CourseVideo(
      pageUrl: "http://127.0.0.1:5555/.test/videos/PDF%20-%20Prece%20contra%20Esp%C3%ADrito%20do%20Ci%C3%BAmes.html" # Some downloaded Podia video page
    )
    newHttpClient().update video
    # video.getMeta
    # echo video
    # for name, m in video.meta.medias:
    #   echo name, %*m
    # # echo "---"
    # echo video.meta.thumbnail
    # echo video.meta.hdVideo
    # echo "---"
    echo pretty video.toJson
    # for comment in video.comments:
    #   echo comment[]
    #   for comment in comment.nested:
    #     echo "  ", comment[]
    #     for comment in comment.nested:
    #       echo "    ", comment[]
  else:
    var course = newHttpClient().extractCourse "http://127.0.0.1:5500/view/courses/b2b.html"
    # let course = readFile(".test/coue")
    # let course = newHttpClient().extractCourse "http://127.0.0.1:5555/.test/courses/Aprenda%20a%20Criar%20Cursos%20Online%20Uma%20Renda%20Extra%20para%20suas%20Horas%20Vagas!.html"
    # echo pretty course.lectures[0].videos[0].toJson

    let client = newHttpClient()
    echo course.lectures[0].videos[0]
    client.update course.lectures[0].videos[0]
    getMeta course.lectures[0].videos[0]
    echo pretty course.lectures[0].videos[0].toJson
