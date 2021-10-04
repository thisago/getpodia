# Downpodia - Podia downloader

Easily download podia.com courses videos

## Features

### **Extracted data**
- [x] Course
  - [x] Name
  - [x] Image
  - [x] Description
  - [x] Lectures
    - [x] Name
    - [x] Videos
      - [x] Name
      - [x] PageUrl
      - [x] Code
      - [x] Comments
      - [x] Video comment
        - [x] Author
        - [x] Body
        - [x] Creation
        - [x] Avatar
        - [x] Likes
      - [x] Video meta
        - [x] Filename
        - [x] Url (to download)
        - [x] Width
        - [x] Height
        - [x] Size
        - [x] Bitrate
        - [x] CreatedAt

### CLI

You can can use it from command line.

**Help**
```
$ ./downpodia help
This is a multiple-dispatch command.  -h/--help/--help-syntax is available
for top-level/all subcommands.  Usage is like:
    downpodia {SUBCMD} [subcommand-opts & args]
where subcommand syntaxes are as follows:

  crawl [required&optional-params] [url: string...]
    Extracts all urls from the given page

    Need login cookies to crawl
  Options:
      -c=, --cookieFile=     string  REQUIRED  set cookieFile
      -o=, --outDir=         string  REQUIRED  set outDir
      -e, --extractVideos    bool    true      set extractVideos
      -m, --extractMetaData  bool    true      set extractMetaData

  download [optional-params] [path: string...]
    Creates the folder structure based on lectures and videos and download all videos
  Options:

  all [required&optional-params] [url: string...]
    Crawl and download automatically
  Options:
      -c=, --cookieFile=  string  REQUIRED  set cookieFile
      -o=, --outDir=      string  REQUIRED  set outDir
```

To see help for others commands, use
```bash
$ ./downpodia help <command>
```

#### Usage
1. Login in your podia.com account in your browser
2. Get the course preview url (not video watching page)
3. Get the cookies and put it in a file
4. Replace the `<label...>` with the correct values
    ```bash
    $ ./downpodia all -c <cookies file> -o <output dir> <course url>
    ```
5. Wait extract and download
6. Enjoy watching the course! :)

---

## Researches

### Podia website is a `Wordpress` site
If you access `/wp-admin` you get a message that your browser was been blocked.
But it doesn't

The pages uses the `storefront` script, which is a `Wordpress` theme
```html
<script src="https://cdn.podia.com/packs/js/storefront/index-b83927663680684733fc.js" data-turbo-track="reload"></script>
```

And it loads images from wp.com

### Embed URL in `json` metadata
The site adds a "metadata" in top with a `embedUrl`

this url don't even need login

Just use `JDownloader` to easily download

## License

GPL-3
