# eleventy-plugin-metagen

[![NPM Version](https://img.shields.io/npm/v/eleventy-plugin-metagen.svg?style=flat)](https://www.npmjs.org/package/eleventy-plugin-metagen)
[![NPM Downloads](https://img.shields.io/npm/dm/eleventy-plugin-metagen.svg?style=flat)](https://npmcharts.com/compare/eleventy-plugin-metagen?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=eleventy-plugin-metagen)](https://packagephobia.com/result?p=eleventy-plugin-metagen)

An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) that generates document metadata containing: Open Graph, Twitter card, generic meta tags, CSS, JS, canonical link, and custom tags. See [metagen docs](https://metagendocs.netlify.app/docs/intro) for more details on plugin usage.

## Installation
Install the plugin from [npm](https://www.npmjs.com/package/eleventy-plugin-metagen):

```
npm install eleventy-plugin-metagen
```

Add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const metagen = require('eleventy-plugin-metagen');

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(metagen);
};
```

## What does it do?
The plugin turns [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```njk
{% metagen
  title='Eleventy Plugin Meta Generator',
  desc='An eleventy shortcode for generating meta tags.',
  url='https://tannerdolby.com',
  img='https://tannerdolby.com/images/arch-spiral-large.jpg',
  img_alt='Archimedean Spiral',
  twitter_card_type='summary_large_image',
  twitter_handle='tannerdolby',
  name='Tanner Dolby',
  generator='eleventy',
  comments=true,
  css=['style.css', 'design.css'],
  js=['foo.js', 'bar.js:async'],
  inline_css='h1 { color: #f06; }',
  inline_js='console.log("hello, world.");'
%}
```

into `<meta>` tags and other document metadata like this:

```html
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Eleventy Plugin Meta Generator</title>
<meta name="author" content="Tanner Dolby">
<meta name="description" content="An eleventy shortcode for generating meta tags.">
<meta name="generator" content="eleventy">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://tannerdolby.com">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="Eleventy Plugin Meta Generator">
<meta property="og:description" content="An eleventy shortcode for generating meta tags.">
<meta property="og:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta property="og:image:alt" content="Archimedean Spiral">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@tannerdolby">
<meta name="twitter:creator" content="@tannerdolby">
<meta name="twitter:url" content="https://tannerdolby.com">
<meta name="twitter:title" content="Eleventy Plugin Meta Generator">
<meta name="twitter:description" content="An eleventy shortcode for generating meta tags.">
<meta name="twitter:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg">
<meta name="twitter:image:alt" content="Archimedean Spiral">
<link rel="canonical" href="https://tannerdolby.com">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="design.css">
<style>h1 { color: #f06; }</style>
<script src="foo.js"></script>
<script src="bar.js" async></script>
<script>console.log("hello, world.");</script>
```

## Use Your Template Data
To make your metadata dynamic, you can use template data as arguments to the shortcode without quotes or braces. The following example is within a Nunjucks file:

```njk
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

Shorthand syntax:

```njk
---
metadata:
  title: foo bar
  desc: some desc
  ...
---
{% metagen metadata %}
```