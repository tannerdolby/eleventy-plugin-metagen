# eleventy-plugin-add-meta-tags

An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) which generates document metadata containing: Open Graph, Twitter card, generic meta tags and a canonical link.

<!-- ## Installation (TODO)
`npm install eleventy-meta-generator` to make the shortcode `metagen` available in your project. -->

## What does it do?
It turns [shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```html
{% metagen 
    title="Eleventy Plugin Add Meta Tags",
    desc="An eleventy shortcode for generating meta tags.",
    url="https://tannerdolby.com",
    img="https://tannerdolby.com/arch-spiral-large.jpg",
    img_alt="Archimedean Spiral",
    twitterHandle="@tannerdolby",
    name="Tanner Dolby"
%}
```
into document metadata like this:

```html
<meta charset="utf-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width initial-scale=1"> 
<title>Eleventy Plugin Add Meta Tags</title> 
<meta name="author" content="Tanner Dolby"> 
<meta name="description" content="An eleventy shortcode for generating meta tags."> 
<meta property="og:title" content="Eleventy Plugin Add Meta Tags"> 
<meta property="og:type" content="website"> 
<meta property="og:description" content="An eleventy shortcode for generating meta tags."> 
<meta property="og:url" content="https://tannerdolby.com"> 
<meta property="og:img" content="https://tannerdolby.com/arch-spiral-large.jpg"> 
<meta property="og:img:alt" content="Archimedean Spiral"> 
<meta name="twitter:card" content="summary"> 
<meta name="twitter:site" content="@tannerdolby"> 
<meta name="twitter:title" content="Eleventy Plugin Add Meta Tags"> 
<meta name="twitter:description" content="An eleventy shortcode for generating meta tags."> 
<meta name="twitter:image" content="https://tannerdolby.com/arch-spiral-large.jpg"> 
<meta name="twitter:image:alt" content="Archimedean Spiral"> 
<link rel="canonical" href="https://tannerdolby.com">
```

### Custom Usage
Providing all seven arguments to `metagen` is recommended, but until there is support for template variables to be parameters in the `metagen` shortcode. If you only need a few meta tags, that works! 

Only the arguments you provide data for will be generated as `<meta>` tags. This allows you to include some of your own tags alongside `metagen` that use data from other sources, such as `<meta property="og:title" content="{{ page.url }}>"`. See [Limitations](https://github.com/tannerdolby/eleventy-plugin-add-meta-tags#limitations) for more!

## Shortcode Options
If data is provided to `metagen`, the default tags aside from Open Graph and Twitter card are:
```
<meta charset="utf-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width initial-scale=1"> 
<title></title> 
```

The `title` parameter also provides data for `<title>`. If `title` is not defined within `metagen` the `<title></title>` element will not be generated with the above default tags.

[Open Graph Reference](https://ogp.me/):

| property | param | example | content |
| ------ | ------ | ------ | ------ |
| [og:title] | `title` | "Eleventy Meta Tag Plugin"  | The title of your object as it should appear in the graph. |
| [og:type] | not required | "website" | The type of your object, default option is website. |
| [og:description] | `desc` | "An eleventy shortcode for generating meta tags." | A one or two sentence description of your object. |
| [og:url] | `url` | "https://tannerdolby.com" | The canonical URL of your object that will be used as its permanent ID in the graph. |
| [og:image] | `img` | "https://tannerdolby.com/arch-spiral-large.jpg" | An image URL which should represent your object within the graph. |
| [og:image:alt] | `img_alt` | "An Archimedean Spiral" | A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. |

[Twitter Card Reference](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup):

| name | param | example | content |
| ------ | ------ | ------ | ------ |
| [twitter:card] | not required | "summary" | Must be set to a value of summary (this is default). |
| [twitter:site] | `twitterHandle` | "@tannerdolby" | The Twitter @username the card should be attributed to. |
| [twitter:title] | `title` | "Eleventy Meta Tag Plugin" | A concise title for the related content. |
| [twitter:description] | `desc` | "An eleventy shortcode for generating meta tags."  | Description of content. |
| [twitter:img] | `img` | "https://tannerdolby.com/arch-spiral-large.jpg" | A URL to a unique image representing the content of the page. |
| [twitter:img:alt] | `img_alt` | "An Archimedean Spiral" | A text description of the image conveying the essential nature of an image to users who are visually impaired. |

## TODO
- [ ] Figure out how to use template variables as parameters to the shortcode, I tried pairedShortCode but need to investigate more.
- [ ] Use Open Graph API with `eleventy-cache-assets` to cache the `url` request and make sure output is correct for meta tags.
- [ ] Maybe add a few more meta tags that are commonly used and not included in the shortcode output

## Limitations
Currently the biggest limitation of this plugin is the fact that the parameters passed into the shortcode `metagen` will have to be user input strings. Passing template variables such as `{{ var }}` as parameters to `metagen` is not yet supported.

> If you want to use data from eleventy front matter data, global data and things like `{{ page.url }}`. You must wait until its supported.

Note: I recommend using the `metagen` shortcode for `HTML` pages that don't rely on data from front matter, global data or eleventyComputed in the `<head>`. One example of the current limitations occur when using [Pagination](https://www.11ty.dev/docs/pagination/), since the pages are being generated from a single layout or template file, I use `<meta property="og:url" content="{{ page.url }}">` to provide the correct URL even if the filename changes. This is a clear example of where you would keep the `<meta>` tags that need template variable data `{{ data }}` and use `metagen` for any remaining tags until this functionality is supported.

## Maintainers
@tannerdolby

## Other Meta tag generators
- [eleventy-plugin-meta-generator](https://github.com/Ryuno-Ki/eleventy-plugin-meta-generator)