## Base utilities for extractor

# from std/uri import parseUri, `/`
# export uri

from std/htmlparser import parseHtml
export htmlparser

from std/xmltree import findAll, XmlNode, attr, items, innerText
export xmltree

from std/httpclient import newHttpClient, close, getContent
export httpclient

const userAgent* = "Mozilla/5.0 (X11; Linux x86_64; rv\":7\"8.0) Gecko/20100101 Firefox/78.0"

using
  node: XmlNode

type
  FindAttr* = tuple
    attr, val: string

func findAll*(node; tagName: string; attrs: openArray[FindAttr];
             caseInsensitive = false): seq[XmlNode] =
  ## Find all tags with given attributes
  ##
  ## TODO: Save this in a separated module
  for node in node.findAll(tagName, caseInsensitive):
    for (key, val) in attrs:
      if val == node.attr key:
        result.add node
func findAll*(node; sels: openArray[(string, seq[FindAttr])];
              caseInsensitive = false): seq[XmlNode] =
  ## querySelectorAll
  ##
  ## TODO: Save this in a separated module
  var el = node
  for (name, attrs) in sels:
    result = el.findAll(name, attrs, caseInsensitive)
    if result.len == 0:
      break
    el = result[0]

const InvalidFilename = {'/','\\',':','*','?','"','<','>'}
proc secureName*(str: string): string =
  for ch in str:
    if ch notin InvalidFilename:
      result.add ch
