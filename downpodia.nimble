# Package

version       = "3.3.0"
author        = "Thiago Ferreira"
description   = "Easily download podia.com courses videos"
license       = "GPL-3"
srcDir        = "src"

# Dependencies

requires "nim >= 1.0.0"

task build_release, "Builds the release version":
  exec "nimble -d:release build"
task build_danger, "Builds the danger version":
  exec "nimble -d:danger build"
task gen_docs, "Generates the documentation":
  exec "nim doc --project --out:docs src/downpodia.nim"

task build_win, "Builds the release version":
  exec "nimble -d:release -d:mingw build"
