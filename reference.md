# eleventy-plugin-metagen reference

`metagen` arguments:
- `title`
- `desc`
- `url`
- `img`
- `img_alt`
- `twitterHandle`
- `name`

Use all seven arguments or just a few depending on your needs, it will generate `<meta>` tags for arguments you provide data for, otherwise only generates the default generic tags.

| tag | param | example | content |
| ------ | ------ | ------ | ------ |
| [og:title] | `title` | "Eleventy Meta Tag Plugin"  | The title of your object as it should appear in the graph. |
| [og:type] | default | "website" | The type of your object. The default type is website. |
| [og:description] | `desc` | "An eleventy shortcode for generating meta tags." | A one or two sentence description of your object. |
| [og:url] | `url` | "https://tannerdolby.com" | The canonical URL of your object that will be used as its permanent ID in the graph. |
| [og:image] | `img` | "https://tannerdolby.com/arch-spiral-large.jpg" | An image URL which should represent your object within the graph. |
| [og:image:alt] | `img_alt` | "An Archimedean Spiral" | A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. |

## [Twitter Card Reference](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup):

| tag | param | example | content |
| ------ | ------ | ------ | ------ |
| [twitter:card] | default | "summary" | Must be set to a value of summary (included by default). |
| [twitter:site] | `twitterHandle` | "@tannerdolby" | The Twitter @username the card should be attributed to. |
| [twitter:title] | `title` | "Eleventy Meta Tag Plugin" | A concise title for the related content. |
| [twitter:description] | `desc` | "An eleventy shortcode for generating meta tags."  | Description of content. |
| [twitter:img] | `img` | "https://tannerdolby.com/arch-spiral-large.jpg" | A URL to a unique image representing the content of the page. |
| [twitter:img:alt] | `img_alt` | "An Archimedean Spiral" | A text description of the image conveying the essential nature of an image to users who are visually impaired. |