# Package

version       = "3.4.0"
author        = "Thiago Ferreira"
description   = "Easily download podia.com courses videos"
license       = "GPL-3"
srcDir        = "src"

# Dependencies

requires "nim >= 1.0.0"

task gen_docs, "Generates the documentation":
  exec "nim doc --project --out:docs src/downpodia.nim"
