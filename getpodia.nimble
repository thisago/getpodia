# Package

version       = "3.5.0"
author        = "Thiago Navarro"
description   = "Extract Podia sites courses data"
license       = "GPL-3"
srcDir        = "src"

# Dependencies

requires "nim >= 1.0.0"
requires "https://github.com/thisago/findxml"

task gen_docs, "Generates the documentation":
  exec "nim doc --project --out:docs src/downpodia.nim"
