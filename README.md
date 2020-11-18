# eleventy-plugin-add-metatags
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
        title="Some Title",
        desc="A brief description of the page",
        img="/path-to-img.jpg",
        img_alt="My website logo",
        url="https://tannerdolby.com",
        twitterHandle="@tannerdolby" 
    %}
</head>
```

Which outputs the Open Graph and Twitter card `<meta>` tags into the document's `<head>`:

```html
<head>
    <!-- Open Graph Metadata -->
    <meta name="og:url" content="https://tannerdolby.com">
    <meta name="og:type" content="website">
    <meta name="og:title" content="Some Title">
    <meta name="og:description" content="A brief description of the page">
    <meta name="og:img" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="og:img:alt" content="My website logo">
    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@tannerdolby">
    <meta name="twitter:url" content="https://tannerdolby.com">
    <meta name="twitter:title" content="Some Title">
    <meta name="twitter:description" content="A brief description of the page">
    <meta name="twitter:image" content="https://tannerdolby.com/path-to-img.jpg">
    <meta name="twitter:image:alt" content="My website logo">
</head>
```

## Open Graph and Twitter Card meta tag options and info
Todo

## Maintainers
@tannerdolby

## License
MIT