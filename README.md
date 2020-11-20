# eleventy-plugin-metagen
An Eleventy [shortcode](https://www.11ty.dev/docs/shortcodes/) which generates document metadata containing: Open Graph, Twitter card, generic meta tags and a canonical link.

## Installation
In your Eleventy project, [install the plugin](https://www.npmjs.com/package/eleventy-plugin-metagen) from npm:

```
npm install eleventy-plugin-metagen
```

Then add it into your [Eleventy Config](https://www.11ty.dev/docs/config/) file:

```js
const metagen = require('eleventy-plugin-metagen');

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(metagen);
};
```

## What does it do?
The plugin turns [11ty shortcodes](https://www.11ty.dev/docs/shortcodes/) like this:

```html
{% metagen 
    title="Eleventy Plugin Add Meta Tags",
    desc="An eleventy shortcode for generating meta tags.",
    url="https://tannerdolby.com",
    img="https://tannerdolby.com/images/arch-spiral-large.jpg",
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
<meta property="og:img" content="https://tannerdolby.com/images/arch-spiral-large.jpg"> 
<meta property="og:img:alt" content="Archimedean Spiral"> 
<meta name="twitter:card" content="summary"> 
<meta name="twitter:site" content="@tannerdolby"> 
<meta name="twitter:title" content="Eleventy Plugin Add Meta Tags"> 
<meta name="twitter:description" content="An eleventy shortcode for generating meta tags."> 
<meta name="twitter:image" content="https://tannerdolby.com/images/arch-spiral-large.jpg"> 
<meta name="twitter:image:alt" content="Archimedean Spiral"> 
<link rel="canonical" href="https://tannerdolby.com">
```

### Custom Usage
Providing all seven comma separated arguments to `metagen` is recommended until there is support for template variables to be parameters in the `metagen` shortcode. You might only need a few meta tags instead of the whole set, simply use the arguments you need and the ones not included won't generate `<meta>` tags.

Only the arguments you provide data for will be generated as `<meta>` tags. This allows you to include some of your own tags alongside `metagen` that use data from other sources, such as `<meta property="og:title" content="{{ page.url }}>"`.

## Shortcode Options

If data is provided to `metagen`, the default tags aside from the main Open Graph and Twitter card data are:

```
<meta charset="utf-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="viewport" content="width=device-width initial-scale=1"> 
<title></title> 
<meta name="author" content="">
<meta name="description" content="">
<meta property="og:type" content="website"> 
<meta name="twitter:card" content="summary"> 
```

The `title` parameter also provides data for `<title>`. If `title` is not defined within `metagen` the `<title>` element will not be generated with the above default tags. The same rules apply for `name` and `desc`.

Using `{% metagen %}` without any arguments will throw `Error: No data was added into the meta generator` and return an empty string.

### Meta Tag Reference
- [Open Graph](https://ogp.me/)
- [Twitter Card](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)

## TODO
- [ ] Figure out how to use template variables as parameters to the shortcode, I tried pairedShortCode but need to investigate more.
- [ ] Use Open Graph API with `eleventy-cache-assets` to cache the `url` request and make sure output is correct for meta tags.
- [ ] Maybe add a few more meta tags that are commonly used and not included in the shortcode output

## Limitations
Currently the biggest limitation of this plugin is the fact that the parameters passed into the shortcode `metagen` will have to be user input strings. Passing template variables such as `{{ var }}` as parameters to `metagen` is not yet supported.

> If you want to use data from eleventy front matter data, global data and things like `{{ page.url }}`. You must wait until its supported.

Note: I recommend using the `metagen` shortcode for `HTML` pages that don't rely on data from front matter, global data or eleventyComputed in the `<head>`. One example of the current limitations occur when using [Pagination](https://www.11ty.dev/docs/pagination/). 

Since the pages are being generated from a single layout or template file, I use `<meta property="og:url" content="{{ page.url }}">` to provide the correct URL even if the filename changes. This is a clear example of where you would keep the `<meta>` tags that need template variable data `{{ data }}` and use `metagen` for any remaining tags until this functionality is supported.

## Maintainers
@tannerdolby

## Other Meta tag generators
- [eleventy-plugin-meta-generator](https://github.com/Ryuno-Ki/eleventy-plugin-meta-generator)