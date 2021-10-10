## CLI interface of DownPodia
##
## Easily download all podia.com courses

from downpodia/course import extractCourse, update, getMeta, Course, getCode
export course
from downpodia/pages import homepage, page, video
export pages


when isMainModule:
  import downpodia/base
  from downpodia/progress import progressBar, showBar
  from std/os import fileExists, dirExists, setCurrentDir, createDir, `/`, getFileSize,
                    moveFile, walkDir, pcDir, expandFilename
  from std/strformat import fmt
  from std/strutils import repeat
  from std/httpclient import downloadFile

  from std/browsers import openDefaultBrowser
  import std/[
    json,
    terminal
  ]

  const
    dataJsonFile {.strdefine.} = "data.json"
    downloadState {.strdefine.} = "state.json"
    indexHtmlFile {.strdefine.} = "index.html"
    identChar {.strdefine.} = ' '
    thumbnailFile {.strdefine.} = "thumbnail.png"

  proc showCourse(course: Course; description = true) =
    stdout.styledWrite fgCyan, "Course: "
    echo course.name

    if description:
      if course.description.len > 0:
        stdout.styledWrite fgCyan, "Description: "
        echo course.description
      else:
        styledEcho fgCyan, "No description"

  proc crawl(url: seq[string]; cookieFile: string; outDir: string;
            extractVideos = true; extractMetadata = true) =
    ## Extracts all urls from the given page
    ##
    ## Need login cookies to crawl
    if url.len < 1:
      quit "Please insert at least one url"
    if url.len > 1:
      for p in url:
        crawl(@[p], cookieFile, outDir, extractVideos, extractMetadata)
      return
    if not cookieFile.fileExists:
      quit "Cookie file not exists"
    let cookie = readFile cookieFile
    if cookie.len < 1:
      quit "Cookie file is empty"
    if outDir.len < 1:
      quit "No courses directory provided"
    let url = url[0]
    if url.len < 1:
      quit "No url provided"
    styledEcho styleDim, "Crawling"
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

      showCourse course

      proc progress(now: range[0..1]; text: string) =
        showBar progressBar(int now, 1, rText = " " & text)
      if extractVideos:
        var l = 0
        for lecture in course.lectures.mitems:
          echo ""
          var v = 0
          for video in lecture.videos.mitems:
            stdout.styledWrite fgGreen, "Extracting"
            echo fmt" {video.name} [{v}/{lecture.videos.len - 1}] - {lecture.name} [{l}/{course.lectures.len - 1}]"

            progress 0, "Video data"
            client.update video
            if extractMetadata:
              progress 1, "Metadata"
              video.getMeta
            showBar ""
            inc v
          inc l
      client.close()
    let courseDir = outDir / course.code
    if not dirExists courseDir:
      createDir courseDir
    writeFile courseDir / dataJsonFile, $ %* course

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

  proc download*(courseDir: seq[string]) =
    ## Creates the folder structure based on lectures and videos and download all videos
    if courseDir.len < 1:
      quit "Please provide at least one course directory"
    if courseDir.len > 1:
      for p in courseDir:
        download(@[p])
      return
    let courseDir = courseDir[0]
    if courseDir.len < 1:
      quit "No courseDir provided"
    setCurrentDir courseDir
    styledEcho styleDim, "Downloading"

    var course = dataJsonFile.readFile.parseJson.to Course

    showCourse course

    if not fileExists downloadState:
      writeFile downloadState, "{}"

    var state = downloadState.readFile.parseJson

    for l, lecture in course.lectures:
      echo ""
      let lDir = fmt"{l}-{lecture.name.secureName}"
      if not state.hasKey lecture.name:
        state{lecture.name} = newJObject()
      createDir lDir
      var lectState = state{lecture.name}
      stdout.styledWrite fgGreen, "Lecture"
      echo fmt" {lecture.name} [{l}/{course.lectures.len - 1}]"
      for v, video in lecture.videos:
        var skip = false
        let
          vDir = lDir / fmt"{v}-{video.name.secureName}"
          fileOut = vDir / video.meta.filename
        stdout.write identChar.repeat 2
        if fileExists fileOut:
          let fileSize = fileOut.getFileSize
          if lectState{video.code}.getInt == fileSize:
            skip = true
          if fileSize != video.meta.size:
            skip = false
            stdout.styledWrite fgRed, "Video is corrupt. "
        if skip:
          stdout.styledWrite fgYellow, "Skipping"
        else:
          stdout.styledWrite fgGreen, "Downloading"
        echo fmt" {video.name} [{v}/{lecture.videos.len - 1}]"
        if skip:
          continue
        createDir vDir
        block down:
          var client = newHttpClient()
          client.headers = newHttpHeaders({
            "User-Agent": userAgent
          })
          client.onProgressChanged = onChangeProgress
          let thumbOut = vDir / thumbnailFile
          when defined release:
            client.downloadFile(video.meta.hdVideo, filename = fileOut)
            client.downloadFile(video.meta.thumbnail, filename = thumbOut)
          else:
            fileOut.writeFile video.meta.hdVideo
            thumbOut.writeFile video.meta.thumbnail
          client.close()
        lectState{video.code} = %fileout.getFileSize
        writeFile downloadState, $ state
        showBar ""

  proc genPages*(coursesFolder: seq[string]) =
    if coursesFolder.len != 1:
      quit "Please provide just one courses path"
    let coursesFolder = coursesFolder[0]
    var courses: seq[Course]
    for dir in walkDir coursesFolder:
      if dir.kind != pcDir:
        continue
      let jsonFile = dir.path / dataJsonFile
      let course = jsonFile.readFile.parseJson.to Course
      showCourse(course, description = false)

      let courseDir = coursesFolder / course.code
      writeFile(courseDir / indexHtmlFile, course.page)
      for l, lecture in course.lectures:
        echo ""
        stdout.styledWrite fgGreen, "Generating lecture page "
        echo lecture.name
        let lectureDir = courseDir / fmt"{l}-{lecture.name.secureName}"
        for v, video in lecture.videos:
          stdout.styledWrite identChar.repeat 2, fgGreen, "Generating video page "
          echo video.name
          let videoDir = lectureDir / fmt"{v}-{video.name.secureName}"
          writeFile(videoDir / indexHtmlFile, course.video(l, v))
      courses.add course
    let indexPage = coursesFolder / indexHtmlFile
    writeFile(indexPage, homepage courses)
    openDefaultBrowser indexPage

  proc all*(urls: seq[string]; cookieFile, outDir: string) =
    ## Crawl and download automatically
    let outputDir = expandFilename outDir
    for url in urls:
      let code = getCode url
      if not fileExists outputDir / code / dataJsonFile:
        crawl(urls, cookieFile, outputDir)
      else:
        styledEcho fgYellow, "Skipping data extract"
      download(@[outputDir / code])
    genPages(@[outputDir])

  import pkg/cligen
  dispatchMulti([crawl, short = {
    "extractMetadata": 'm'
  }], [
    download
  ], [
    all
  ],
  [
    genPages
  ])
