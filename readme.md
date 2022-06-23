# Getpodia - Podia data extractor

Extract Podia sites courses data

## Features

### **Extracted data**
- [x] Course
  - [x] Name
  - [x] Image
  - [x] Description
  - [x] Code (Url identifier)
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
        - [x] Nested comments
      - [x] Video meta
        - [x] Filename
        - [x] Medias table (videos in many resolutions, thumbnails and storyboard)
          - [x] Slug
          - [x] Url (to download)
          - [x] Width
          - [x] Height
          - [x] Size
          - [x] CreatedAt

---

## TODO

- [x] Fix docs generation
- [ ] `course.VideoComment.creation` needs to store unix time instead string
- [ ] Use the useragent from a module

---

<!-- ## Researches -->
<!--
### Podia website is a `Wordpress` site
If you access `/wp-admin` you get a message that your browser was been blocked.
But it doesn't

The pages uses the `storefront` script, which is a `Wordpress` theme
```html
<script src="https://cdn.podia.com/packs/js/storefront/index-b83927663680684733fc.js" data-turbo-track="reload"></script>
```

And it loads images from wp.com
-->
<!-- ### Embed URL in `json` metadata
The site adds a "metadata" in top with a `embedUrl`

this url don't even need login

The problem for that is that for load this data, needs Javascript, so it was discarted -->

## License

GPL-3
