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
