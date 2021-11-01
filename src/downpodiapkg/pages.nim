## HTML Pages generation

from std/strformat import fmt

include "./pages/base.nimf"
include "./pages/home.nimf"
include "./pages/course.nimf"
include "./pages/video.nimf"

import downpodia/course

proc homepage*(courses: seq[Course]): string =
  genBase "Home", genHome courses

proc page*(course: Course): string =
  genBase course.name, genCourse(course)
proc video*(course: Course; lectureIndex, videoIndex: int): string =
  genBase fmt"{course.lectures[lectureIndex].videos[videoIndex].name} - {course.lectures[lectureIndex].name} - {course.name}", genVideo(course, lectureIndex, videoIndex)
