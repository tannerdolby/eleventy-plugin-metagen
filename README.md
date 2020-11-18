# eleventy-meta-generator
An Eleventy Plugin that generates Open Graph and Twitter Card meta tags within the `<head>` of the document. How search engines and social medias display your website is through open graph and twitter card meta tags.

## Installation
`npm install eleventy-meta-generator` to make the shortcode `metagen` available in your project.

## Configuration
Add the plugin to your Eleventy Config File: (usually `.eleventy.js`)

```js
const metagen = require(''); // require the npm plugin

module.exports = (eleventyConfig) => {
    // add the plugin using the Configuration API
    eleventyConfig.addPlugin(metagen);
};
```

## Usage
Use the shortcode in a template file:

{% raw %}
```html
<head>
    {% metaGenerate
        title="Some Title",
        desc="A brief description of the page",
        img="/path-to-img.jpg",
        img_alt="My website logo",
        url="https://tannerdolby.com",
        twitterHandle="@tannerdolby" 
    %}
</head>
```
{% endraw %}

Which outputs:

{% raw %}
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
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
{% raw %}

## Open Graph and Twitter Card meta tag options and info
Todo

# Maintainers
@tannerdolby

# License
MIT