module.exports = (eleventyConfig, pluginNamespace) => {
    eleventyConfig.namespace(pluginNamespace, () => {
        eleventyConfig.addShortcode("metagen", (data) => {
            if (data) {
                const metadata = `<meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${data.title}</title>
                    <meta name="author" content="${data.name}">
                    <meta name="description" content="${data.desc}">\n`;
                const openGraph = `${data.comments ? `${(data.og_comment ? `<!-- ${data.og_comment} -->` : '<!-- Open Graph -->')}` : ''}
                    <meta property="og:type" content="website">
                    <meta property="og:locale" content="${isDef(data.locale, 'en_US')}">
                    <meta property="og:title" content="${data.title}">
                    ${data.site_name ? `<meta property="og:site_name" content="${data.site_name}">` : ''}
                    <meta property="og:description" content="${data.desc}">
                    <meta property="og:url" content="${data.url}">
                    <meta property="og:image" content="${data.img}">
                    <meta property="og:image:alt" content="${data.img_alt}">
                    ${data.img_width ? `<meta property="og:image:width" content="${data.img_width}">` : ''}
                    ${data.img_height ? `<meta property="og:image:height" content="${data.img_height}">` : ''}\n`;
                const twitterCard = `${data.comments ? `${(data.twitter_comment ? `<!-- ${data.twitter_comment} -->` : '<!-- Twitter -->')}` : ''}
                    <meta ${isDef(data.attr_name, 'name')}="twitter:card" content="${isDef(data.twitter_card_type, 'summary')}">
                    <meta ${isDef(data.attr_name, 'name')}="twitter:site" content="@${data.twitter_handle}">
                    ${isDef(data.twitter_card_type, "", ["summary_large_image", `<meta name="twitter:creator" content="@${isDef(data.creator_handle, data.twitter_handle)}">`])}
                    <meta ${isDef(data.attr_name, 'name')}="twitter:url" content="${data.url}">
                    <meta ${isDef(data.attr_name, 'name')}="twitter:title" content="${data.title}">
                    <meta ${isDef(data.attr_name, 'name')}="twitter:description" content="${data.desc}">
                    <meta ${isDef(data.attr_name, 'name')}="twitter:image" content="${data.img}">
                    <meta ${isDef(data.attr_name, 'name')}="twitter:image:alt" content="${data.img_alt}">\n`;
                const canonical = `<link rel="canonical" href="${data.url}">`;

                function isDef(prop, fallback, c=null) {
                    if (c && typeof c == 'object' && c[0] == 'summary_large_image') {
                        return prop == c[0] ? c[1] : fallback
                    }
                    return prop ? prop : fallback;
                }

                function makeArray(templateLiteral) {
                    return templateLiteral.split("\n");
                }

                function removeEmptyTags(literalArr) {
                    return literalArr.filter(tag => {
                        return tag.includes("undefined") === false;
                    });
                }

                function format(literalArr) {                  
                    return literalArr.join("\n").replace(/^\s+|[,]$/gm, "");
                }

                const output = makeArray(metadata.concat(openGraph, twitterCard, canonical));
                const validTags = removeEmptyTags(output);
                const cleanOutput = format(validTags);

                return cleanOutput;
            } else {
                console.log("Error: No data was added into the meta generator")
                return "";
            }
        });
   });
};