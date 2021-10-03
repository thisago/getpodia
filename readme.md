# Podia downloader

In this project I will try to download the videos from Podia

## UPDATE

The site adds a "metadata" in top with a `embedUrl`

this url don't even need login

Just use `JDownloader` to easily download

## Researches

### Podia website is a `Wordpress` site
If you access `/wp-admin` you get a message that your browser was been blocked.
But it doesn't

The pages uses the `storefront` script, which is a `Wordpress` theme
```html
<script src="https://cdn.podia.com/packs/js/storefront/index-b83927663680684733fc.js" data-turbo-track="reload"></script>
```
