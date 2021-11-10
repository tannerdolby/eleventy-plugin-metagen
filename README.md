# eleventy-plugin-metagen
An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) that generates document metadata containing: Open Graph, Twitter card, generic meta tags and a canonical link. See [metagen-docs](https://github.com/tannerdolby/metagen-docs) for plugin documentation.

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
    title="Eleventy Plugin Meta Generator",
    desc="An eleventy shortcode for generating meta tags.",
    url="https://tannerdolby.com",
    img="https://tannerdolby.com/images/arch-spiral-large.jpg",
    img_alt="Archimedean Spiral",
    twitter_card_type="summary_large_image",
    twitter_handle="tannerdolby",
    name="Tanner Dolby",
    generator="eleventy",
    comments=true
%}
```
into `<meta>` tags and other document metadata like this:

```html
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Eleventy Plugin Meta Generator</title>
<meta name="author" content="Tanner Dolby">
<meta name="title" content="Eleventy Plugin Meta Generator">
<meta name="description" content="An eleventy shortcode for generating meta tags.">
<meta name="generator" content="eleventy">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="Eleventy Plugin Meta Generator">
<meta property="og:description" content="An eleventy shortcode for generating meta tags.">
<meta property="og:url" content="https://tannerdolby.com">
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
```

## Custom Usage
For a baseline social share functionality, providing all of the comma separated arguments to `metagen` shown in the example usage above is recommended. If you want to add more tags not listed in the example, have a look at the plugin docs. You might only need a few `<meta>` tags instead of the whole set, simply provide the arguments you need and the ones not included won't generate `<meta>` tags.

Besides the default generated `<meta>` tags, only the arguments you provide data for will be generated as `<meta>` tags. This allows you to include some of your own tags alongside `metagen` if you need. Template variables can be used in the Nunjucks and Liquid shortcode arguments without the curly braces or quotes like `title=page.url` (Nunjucks) or `title` (Liquid). See the eleventy-plugin-metagen [documentation](https://metagendocs.netlify.app/) for more details on plugin usage.

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

### Meta Tag Reference
Most all of the `<meta>` tags found in the documentation below are supported by this plugin. If there is a `<meta>` tag that you need and isn't supported, feel free to open an issue so we can get it added. See [metagen docs](https://metagendocs.netlify.app/) for more information about this plugin.

- [Open Graph](https://ogp.me/)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)

## Contributing
If you notice an issue or a missing meta tag for this plugin, please do [open an issue](https://github.com/tannerdolby/eleventy-plugin-metagen/issues) and we will work to resolve it. 

1. Fork this repo
2. Clone `git clone git@github.com:tannerdolby/eleventy-plugin-metagen.git`
3. Install dependencies `npm install`
4. Build `npm run build`
5. Serve locally `npm run dev`

## Other Meta tag generators
- [eleventy-plugin-meta-generator](https://github.com/Ryuno-Ki/eleventy-plugin-meta-generator)