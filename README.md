# eleventy-plugin-add-meta-tags

A [plugin](https://www.11ty.dev/docs/plugins/) that allows you to generate Open Graph, Twitter Card, and generic meta tags within the `<head>` of any HTML document.

## Installation
`npm install eleventy-meta-generator` to make the shortcode `metagen` available in your project.

## Configuration
Add the plugin to your Eleventy Config File:

```js
const metagen = require(''); // require the npm plugin

module.exports = (eleventyConfig) => {
    // add the plugin using the Configuration API
    eleventyConfig.addPlugin(metagen);
};
```

## Usage
Use the shortcode `metagen` in a template file:

```html
<head>
    {% metagen 
        title="Eleventy Plugin Add Meta Tags",
        desc="A page about eleventy-plugin-add-meta-tags",
        img="/path-to-img.jpg",
        img_alt="Descriptive text for image",
        url="https://tannerdolby.com",
        twitterHandle="@tannerdolby",
        name="Tanner Dolby"
    %}
</head>
```

Which outputs the Open Graph, Twitter card and generic `<meta>` tags:

```html
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Eleventy Plugin Add Meta Tags</title>
    <meta name="author" content="Tanner Dolby">
    <meta name="description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="og:url" content="https://tannerdolby.com">
    <meta name="og:type" content="website">
    <meta name="og:title" content="Eleventy Plugin Add Meta Tags">
    <meta name="og:description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="og:img" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="og:img:alt" content="Descriptive text for image">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@tannerdolby">
    <meta name="twitter:url" content="https://tannerdolby.com">
    <meta name="twitter:title" content="Eleventy Plugin Add Meta Tags">
    <meta name="twitter:description" content="A page about the eleventy-plugin-add-meta-tags">
    <meta name="twitter:image" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="twitter:image:alt" content="Descriptive text for image">
</head>
```

## Open Graph and Twitter Card meta tag options and info
Todo

## Maintainers
@tannerdolby

## License
MIT