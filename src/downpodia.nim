## CLI interface of DownPodia
##
## Easily download all podia.com courses

import downpodia/base
from downpodia/course import extractCourse, update, getMeta, Course
from downpodia/progressBar import progressBar, showBar
export course

from std/os import fileExists, dirExists, setCurrentDir, createDir, `/`, getFileSize,
                   moveFile
from std/strformat import fmt
from std/httpclient import downloadFile

import std/[
  json,
  terminal
]

const dataJsonFile* {.strdefine.} = "data.json"
const downloadPath* {.strdefine.} = "data"
const downloadState* {.strdefine.} = "data/state.json"

proc crawl(url: seq[string]; cookieFile: string; outDir: string;
           extractVideos = true; extractMetaData = true) =
  ## Extracts all urls from the given page
  ##
  ## Need login cookies to crawl
  if url.len != 1:
    quit "Please insert just one url"
  if not cookieFile.fileExists:
    quit "Cookie file not exists"
  let cookie = readFile cookieFile
  if cookie.len < 1:
    quit "Cookie file is empty"
  if outDir.len < 1:
    quit "No output provided"
  let url = url[0]
  if url.len < 1:
    quit "No url provided"
  var course: Course
  block crawl:
    var client = newHttpClient()
    client.headers = newHttpHeaders({
      "User-Agent": userAgent,
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "Upgrade-Insecure-Requests": "1",
      "Cache-Control": "max-age=0",
      "If-None-Match": "W/\"ab9a360988d25b136b6e45c2d33280cc\""
    })
    course = client.extractCourse(url)
    if extractVideos:
      var l = 0
      for lecture in course.lectures.mitems:
        echo fmt"Extracting lecture '{lecture.name}'"
        echo progressBar(l, course.lectures.len, lText = "Lectures ", rText = fmt" {l}/{course.lectures.len}")
        var v = 0
        for video in lecture.videos.mitems:
          client.update video
          echo progressBar(v, lecture.videos.len, lText = "Videos ", rText = fmt" {v}/{lecture.videos.len}")
          echo fmt"Extracted data from '{video.name}'"
          if extractMetaData:
            echo "Getting meta"
            video.getMeta
          inc v
      inc l
    client.close()
  if not dirExists outDir:
    createDir outDir
  writeFile outDir / dataJsonFile, $ %* course


proc onChangeProgress(total, progress, speed: BiggestInt) =
  let
    total = total.int div 1024 div 1024
    progress = progress.int div 1024 div 1024
    speed = speed.int div 1024 div 1024
  showBar progressBar(
    progress,
    total,
    rText = fmt" {progress}mb/{total}mb Speed: {speed}mb/s"
  )

proc download*(path: seq[string]) =
  ## Creates the folder structure based on lectures and videos and download all videos
  if path.len != 1:
    quit "Please provide just one path"
  let path = path[0]
  if path.len < 1:
    quit "No path provided"
  setCurrentDir path
  var course = dataJsonFile.readFile.parseJson.to Course
  createDir downloadPath

  if not fileExists downloadState:
    writeFile downloadState, "{}"

  var state = downloadState.readFile.parseJson

  for l, lecture in course.lectures:
    let lDir = downloadPath / fmt"{l}-{lecture.name}"
    if not state.hasKey lecture.name:
      state{lecture.name} = newJObject()
    createDir lDir
    var lectState = state{lecture.name}
    for v, video in lecture.videos:
      var skip = false
      if lectState{video.name}.getBool:
        skip = true
        stdout.styledWrite fgYellow, "Skipping"
      else:
        stdout.styledWrite fgGreen, "Downloading"
      echo fmt" {video.name} [{v}/{lecture.videos.len}] - {lecture.name} [{l}/{course.lectures.len}]"
      if skip:
        continue
      let vDir = lDir / fmt"{v}-{video.name}"
      createDir vDir
      block down:
        let fileOut = vDir / video.meta.filename
        var client = newHttpClient()
        client.headers = newHttpHeaders({
          "User-Agent": userAgent
        })
        client.onProgressChanged = onChangeProgress
        client.downloadFile(video.meta.url, filename = fileOut)
        client.close()
      lectState{video.name} = %true
      writeFile downloadState, $ state
      showBar ""

when isMainModule:
  import pkg/cligen
  dispatchMulti([crawl, short = {
    "extractMetaData": 'm'
  }], [
    download
  ])