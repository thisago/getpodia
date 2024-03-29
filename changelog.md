# Changelog

## Version 3.7.5 (2023/12/03)

- Fixed completed lectures extraction now using `nimquery`
- Fixed description extraction
- Fixed file url extraction

## Version 3.7.4 (2023/08/17)

- Disable comment extraction
- Fixed video `pageUrl` link

---

## Version 3.7.3 (Tuesday 6 Jan 2023)

- Added a fallback to `hdVideo`

---

## Version 3.7.2 (Tuesday 6 Jan 2023)

- Fixed lecture name extraction

---

## Version 3.7.1 (Tuesday 6 Dec 2022)

- Fixed duplicated lectures extraction

---

## Version 3.7.0 (Tuesday 6 Dec 2022)

- Fixed video code extraction
- Added file url extraction

---

## Version 3.6.0 (Tuesday 6 Dec 2022)

- Fixed extraction in new podia video page
- Fixed video comments extraction

---

## Version 3.5.0 (2022/06/23)

- Fixed extraction in new podia design 
- Renamed project to getpodia

---

## Version 3.4.4 (11/01/2021)

- Fixed `thumbnail` and `hdVideo` getting to not crash anymore

---

## Version 3.4.3 (11/01/2021)

- Renamed `VideoMeta.name` to `VideoMeta.filename`
- Using [thisago/findxml](https://github.com/thisago/findxml) instead local implementation
- Fixed some imports
- Changed `course.thumbnail` and `course.hdVideo` to template

---

## Version 3.4.2 (11/01/2021)

- Renamed dir `src/downpodiapkg` to `src/downpodia` back again

---

## Version 3.4.1 (11/01/2021)

- Removed useless file and import

---

## Version 3.4.0 (11/01/2021)

- Done [#6](https://github.com/thisago/downpodia/issues/6) and [#7](https://github.com/thisago/downpodia/issues/7)
- Renamed dir `src/downpodia` to `src/downpodiapkg`
- Removed useless imports
- Fixed [#5](https://github.com/thisago/downpodia/issues/5)
- Not a problem anymore [#3](https://github.com/thisago/downpodia/issues/3)
- Removed useless tasks in nimble file

---

## Version 3.3.0 (10/14/2021)

- Fixed [#1](https://github.com/thisago/downpodia/issues/1)

---

## Version 3.2.0 (10/13/2021)

- Clean up

---

## Version 3.1.0 (10/11/2021)

- Added `clean` command to delete all generated pages
- Added description to `genPages` command

---

## Version 3.0.0 (10/10/2021)

- Added page generation to `all` command
- In debug build, the download is replaced by a simple file write to
  help development and tests without internet
  - If in debug build, the `video.nims` will use the remote url of
    video instead local video path as video `src`
- CLI procs and imports now is just made `whenIsMainModule`
- Added video thumbnail
- Added nested comments extracting and in video page generation

---

## Version 2.3.0 (10/08/2021)

- page generation
  - Added comments counter in `video.nimf`

---

## Version 2.2.0 (10/07/2021)

- page generation
  - Added id to lectures
  - video page links to correct lecture

---

## Version 2.1.0 (10/07/2021)

- Added comment likes and creation date in pages generation
- Removed url from like button

---

## Version 2.0.0 (10/06/2021)

- Added Podia HTML pages generation
- Added download size verification
- Added smart folder creation by course name
- Added `code` prop in `Course` type

---

## Version 1.1.2 (10/05/2021)

- Added coursename and description info in `stdout`

---

## Version 1.1.1 (10/04/2021)

- Fixed crash when description not exists

---

## Version 1.1.0 (10/04/2021)

- Added `all` command
- smarter and prettier printing
- Fixed progress counter in log
- Added GPL-3 license
- Added a newline in lecture change

---

## Version 1.0.0 (10/04/2021)

- Added lib and cli
- Release
