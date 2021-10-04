from std/terminal import terminalWidth, setCursorXPos
when defined windows:
  from std/terminal import eraseLine
from std/strformat import fmt

const progress = (
  sides: (
    left: '[',
    right: ']'
  ),
  inner: (
    filled: '#',
    blank: '.'
  )
)

proc progressBar*(curr, max: int, lText = " "; rText = " "): string =
  let percent = (100 * curr) / max
  let progressSize = terminalWidth() - 3 - lText.len - rText.len
  result = fmt"{lText}{progress.sides.left}"
  for i in 0..progressSize:
    let currPercent = (100 * i) / progressSize
    if percent >= currPercent:
      result.add progress.inner.filled
    else:
      result.add progress.inner.blank
  result.add fmt"{progress.sides.right}{rText}"

proc showBar*(txt: string) =
  when defined(windows):
    stdout.eraseLine
    stdout.write txt
  else:
    stdout.write( "\e[2K", txt)
  stdout.flushFile
  stdout.setCursorXPos 0

when isMainModule:
  import os
  const max = 10
  for i in 0..max:
    sleep 100
    showBar progressBar(i, max, rText = fmt"{i}/{max}")
  echo ""
