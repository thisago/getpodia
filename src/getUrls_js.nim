#? stdtmpl(subsChar = '$', metaChar = '#', emit = "f.write")
#from std/os import splitFile, `/`, execShellCmd; from std/strutils import replace; import strformat
#let filename = (block:
#  let (dir, name, _) = splitFile currentSourcePath(); dir / name.replace("_", "."))
#var f = open(filename, fmReadWrite)
#
// ==UserScript==
// @name        Easy calculations copier
// @namespace   Violentmonkey Scripts
// @match       *://*.easycalculation.com/*
// @grant       GM.setValue
// @grant       GM.getValue
// @version     1.0
// @author      Thiago Navarro
// @run-at      document-idle
// @downloadURL file:///data/os/dev/js/violentmonkey/easyCalculationCopier.js
// @description Created At: 06/24/2021 09:54:33 Thursday
//              Modified at: 10/03/2021 08:46:28 PM Sunday
// ==/UserScript==
#
;(async () => {
  const config = {
    indexPage: "https://www.easycalculation.com/index.php",
    delayBetweenPages: 2000,
  }
#
  async function saveCalculation() {
    const calculated = calculate.toString()
#
    console.log(calculated)
    var obj = JSON.parse(await GM.getValue("values", "{}"))
    obj[window.location.pathname] = calculated
#
    await GM.setValue("values", JSON.stringify(obj))
  }
#
  const defaultState = {
    status: {
      getSolves: false,
      getLinks: false,
    },
    calcs: {},
    links: [],
  }
  let state = defaultState
#
  async function saveState() {
    await GM.setValue("state", JSON.stringify(state))
  }
  async function getState() {
    state = JSON.parse(await GM.getValue("state", JSON.stringify(defaultState)))
    await saveState()
  }
#
  await getState()
#
  const utils = {
    getSideMenuLinks: () =>
      [
        ...document.querySelectorAll(
          "#alarmContentDisplay > div.content_right.clearfix > div.right_menu_box a"
        ),
      ].splice(2),
    getColumnsLinks: () => [
      ...document.querySelectorAll(".general_list2_con a"),
    ],
    inIndexPage: () =>
      location.href == config.indexPage || location.pathname == "/",
    inCalcPage: () =>
      ["Calculator", "Reset", "Related Calculators"]
        .map((x) => (document.body.innerHTML.includes(x) ? "" : "-"))
        .join("").length == 0,
    delay: async (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  }
#
  if (utils.inIndexPage()) {
    if (state.status.getLinks == false)
      state.status.getLinks = confirm("You want to get all links?")
#
    if (state.status.getLinks == false)
      state.status.getSolves = confirm("You want to get all calculators codes?")
  }
  if (state.status.getLinks == true) {
    if (utils.inIndexPage()) {
      state.links = []
      await saveState()
#
      const menuLinks = utils.getSideMenuLinks()
#
      for (const link of menuLinks) {
        await getState()
        state.status.getLinks = true
        await saveState()
#
        window.open(link.href, "_blank")
        await utils.delay(config.delayBetweenPages)
      }
    } else if (!utils.inCalcPage()) {
      const links = utils.getColumnsLinks()
      links.map((link) => state.links.push(link.href))
      state.status.getLinks = false
      await saveState()
      window.close()
    }
  } else if (state.status.getSolves == true)
    if (utils.inIndexPage()) {
      for (const link of state.links) {
        await getState()
        state.status.getSolves = true
        await saveState()
        window.open(link, "_blank")
        await utils.delay(config.delayBetweenPages)
      }
#
      state.status.getSolves = false
      await saveState()
    } else if (utils.inCalcPage()) {
      const functionName = [...document.querySelectorAll("input[type=button]")]
        .filter((x) => x.getAttribute("onclick") != "" && x.className == "")[0]
        .getAttribute("onclick")
        .replace(/\(\);?$$/, "")
#
      const calc = eval(`$${functionName}.toString()`)
      const title = document.querySelector(
        "#alarmContentDisplay > div.content_left.clearfix > h1"
      ).innerHTML
#
      state.calcs[title] = calc
      await saveState()
      window.close()
    }
})()
#
## Rename out because file with dot (`.`) is not allowed by Nim
#import os
#moveFile filename, filename.splitFile.dir / "getUrls.user.js"
