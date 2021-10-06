# Package

version       = "1.1.2"
author        = "Thiago Navarro"
description   = "A new awesome nimble package"
license       = "GPL-3"
srcDir        = "src"

# Dependencies

requires "nim >= 1.5.1"

# CLI
requires "cligen"

bin = @["downpodia"]
binDir = "build"

task build_release, "Builds the release version":
  exec "nimble -d:release build"
task build_danger, "Builds the danger version":
  exec "nimble -d:danger build"
task gen_docs, "Generates the documentation":
  exec "nim doc --project --out:docs src/downpodia.nim"

task build_win, "Builds the release version":
  exec "nimble -d:release -d:mingw build"
