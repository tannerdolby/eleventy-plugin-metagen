# eleventy-plugin-metagen
An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) that generates document metadata containing: Open Graph, Twitter card, generic meta tags and a canonical link.

## Installation
In your Eleventy project, [install the plugin](https://www.npmjs.com/package/eleventy-plugin-metagen) from npm:

```
npm install eleventy-plugin-metagen
```

Then add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const metagen = require('eleventy-plugin-metagen');

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(metagen);
};
```

## What does it do?
The plugin turns [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```nunjucks
{% metagen
    title="Eleventy Plugin Add Meta Tags",
    desc="An eleventy shortcode for generating meta tags.",
    url="https://tannerdolby.com",
    img="https://tannerdolby.com/images/arch-spiral-large.jpg",
    img_alt="Archimedean Spiral",
    twitter_card_type="summary_large_image",
    twitter_handle="tannerdolby",
    name="Tanner Dolby"
%}
```
into `<meta>` tags and other document metadata like this:

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
<meta property="og:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta property="og:image:alt" content="Archimedean Spiral">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@tannerdolby">
<meta name="twitter:title" content="Eleventy Plugin Add Meta Tags">
<meta name="twitter:description" content="An eleventy shortcode for generating meta tags.">
<meta name="twitter:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta name="twitter:image:alt" content="Archimedean Spiral">
<link rel="canonical" href="https://tannerdolby.com">
```

### Custom Usage
Providing all eight comma separated arguments to `metagen` is recommended. You might only need a few `<meta>` tags instead of the whole set, simply provide the arguments you need and the ones not included won't generate `<meta>` tags.

Besides the default generated `<meta>` tags, only the arguments you provide data for will be generated as `<meta>` tags. This allows you to include some of your own tags alongside `metagen` if you need. Template variables can be used in the Nunjucks and Liquid shortcode arguments without the curly braces or quotes like `title=page.url` (Nunjucks) or `title` (Liquid). More on template variable usage [below](https://github.com/tannerdolby/eleventy-plugin-metagen#use-your-template-data).

## Shortcode Options

If atleast one parameter is provided to `metagen`, the default tags aside from the main Open Graph and Twitter card data are:

```html
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width initial-scale=1">
<title></title>
<meta name="author" content="">
<meta name="description" content="">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary">
```

The `title` parameter provides data for `<title>`. If `title` is not defined within `metagen`, the `<title>` element will not be generated with the above default tags. The same rules apply for `name` and `desc`. All other arguments if omitted, will not have meta tags generated.

Using `{% metagen %}` without any arguments will throw `Error: No data was added into the meta generator` and return an empty string.

## Shorthand Nunjucks Usage

To turn the shortcode into a one-liner, you can define an object in front matter, global data or another data source with the required key/value pairs and supply the shortcode with a single parameter. 

```nunjucks
---
data: 
    title: Eleventy Plugin Add Meta Tags
    desc: An eleventy shortcode for generating meta tags.
    url: https://tannerdolby.com
    img: https://tannerdolby.com/images/arch-spiral-large.jpg
    img_alt: Archimedean Spiral
    twitter_card_type: summary_large_image
    twitter_handle: tannerdolby
    name: Tanner Dolby
---
<head>
  {% metagen data %}
</head>
```

## Use Your Template Data
To make your metadata dynamic, you can use template data as arguments to the shortcode, without quotes or braces:

```nunjucks
---
title: Some title
desc: Some description
metadata:
  title: Some other title
  desc: Some other description
url: https://tannerdolby.com
image: https://tannerdolby.com/images/arch-spiral-large.jpg
alt: Archimedean spiral
type: summary_large_image 
twitter: tannerdolby
name: Tanner Dolby
---
{% metagen
    title=title or metadata.title,
    desc=desc or metadata.desc,
    url=url + page.url,
    img=image,
    img_alt=alt,
    twitter_card_type=type,
    twitter_handle=twitter,
    name=name
%}
```
As a general rule, don't forget your in a templating engine context. Use your variables in the shortcode as you would inside `{% var %}` tags or `{{ var }}` without the curly braces like `title=var`.

### Liquid Usage

If you would like to use Liquid (which is the default templating engine in Eleventy). Then utilize the following syntax, to turn shortcodes like this:

```liquid
---
data: 
    title: Eleventy Plugin Add Meta Tags
    desc: An eleventy shortcode for generating meta tags.
    url: https://tannerdolby.com
    img: https://tannerdolby.com/images/arch-spiral-large.jpg
    img_alt: Archimedean Spiral
    twitter_card_type: summary_large_image
    twitter_handle: 'tannerdolby'
    name: Tanner Dolby
---
<head>
  {% metagen data %}
</head>
```

into `<meta>` tags and document metadata like this:

```liquid
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Eleventy Plugin Add Meta Tags</title>
<meta name="author" content="Tanner Dolby">
<meta name="description" content="An eleventy shortcode for generating meta tags.">
<meta property="og:title" content="Eleventy Plugin Add Meta Tags">
<meta property="og:type" content="website">
<meta property="og:description" content="An eleventy shortcode for generating meta tags.">
<meta property="og:url" content="https://tannerdolby.com">
<meta property="og:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta property="og:image:alt" content="Archimedean Spiral">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="tannerdolby">
<meta name="twitter:title" content="Eleventy Plugin Add Meta Tags">
<meta name="twitter:description" content="An eleventy shortcode for generating meta tags.">
<meta name="twitter:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta name="twitter:image:alt" content="Archimedean Spiral">
<link rel="canonical" href="https://tannerdolby.com">
```

The Liquid usage is a bit different as the shortcode expects a single parameter representing an object with key/value pairs. You can define the object in front matter like shown above or within global data files.

### Meta Tag Reference
- [Open Graph](https://ogp.me/)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)

## Maintainers
[@tannerdolby](https://github.com/tannerdolby)

## Other Meta tag generators
- [eleventy-plugin-meta-generator](https://github.com/Ryuno-Ki/eleventy-plugin-meta-generator)