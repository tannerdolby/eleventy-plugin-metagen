# eleventy-plugin-add-meta-tags

A [plugin](https://www.11ty.dev/docs/plugins/) that allows you to generate Open Graph, Twitter Card, and generic meta tags.

## What does it do?
It turns [shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```html
<head>
    {% metagen 
        title="Eleventy Plugin Add Meta Tags",
        desc="A page about the eleventy-plugin-add-meta-tags",
        url="https://tannerdolby.com",
        img="/path-to-img.jpg",
        img_alt="Descriptive text for image",
        twitterHandle="@tannerdolby",
        name="Tanner Dolby"
    %}
</head>
```
into document metadata containing Open graph, Twitter card and generic `<meta>` tags like this:

```html
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Eleventy Plugin Add Meta Tags</title>
    <meta name="author" content="Tanner Dolby">
    <meta name="description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="og:title" content="Eleventy Plugin Add Meta Tags">
    <meta name="og:type" content="website">
    <meta name="og:description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="og:url" content="https://tannerdolby.com">
    <meta name="og:img" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="og:img:alt" content="Descriptive text for image">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@tannerdolby">
    <meta name="twitter:title" content="Eleventy Plugin Add Meta Tags">
    <meta name="twitter:description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="twitter:image" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="twitter:image:alt" content="Descriptive text for image">
    <link rel="canonical" href="https://tannerdolby.com">
</head>
```

<!-- ## Installation (TODO)
`npm install eleventy-meta-generator` to make the shortcode `metagen` available in your project. -->

## Shortcode Parameters

[Open Graph Reference](https://ogp.me/):

| name | param | example | content |
| ----- | ----- | ----- | ----- |
| [og:title] | `title` | "Eleventy Meta tag Plugin"  | The title of your object as it should appear in the graph. |
| [og:type] | not required | "website" | The type of your object, default option is website. |
| [og:description] | `desc` | "An eleventy shortcode for generating meta tags" | A one or two sentence description of your object. |
| [og:url] | `url` | "https://tannerdolby.com" | The canonical URL of your object that will be used as its permanent ID in the graph. |
| [og:image] | `img` | "https://tannerdolby.com/arch-sprial-large.jpg" | An image URL which should represent your object within the graph. |
| [og:image:alt] | `img_alt` | "An Archimedean Spiral" | A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. |

[Twitter Card Reference](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup):

| name | param | example | content |
| ----- | ----- | ----- | ----- |
| [twitter:card] | not required | "summary" | Must be set to a value of summary (this is default). |
| [twitter:site] | `twitterHandle` | "@tannerdolby" | The Twitter @username the card should be attributed to. |
| [twitter:title] | `title` | "Eleventy Meta tag Plugin" | A concise title for the related content. |
| [twitter:description] | `desc` | "An eleventy shortcode for generating meta tags."  | Description of content. |
| [twitter:img] | `img` | "https://tannerdolby.com/arch-spiral-large.jpg" | A URL to a unique image representing the content of the page. |
| [twitter:img:alt] | `img_alt` | "An Archimedean Spiral" | A text description of the image conveying the essential nature of an image to users who are visually impaired. |

## TODO
- [ ] Use Open Graph API with `eleventy-cache-assets` to cache the `url` request and make sure output is correct for `og:stuff` tags.
- [ ] Maybe add a few more meta tags that are commonly used and not included in the shortcode output

## Maintainers
@tannerdolby

## Other Meta tag generators
- [eleventy-plugin-meta-generator](https://github.com/Ryuno-Ki/eleventy-plugin-meta-generator)