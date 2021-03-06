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
                const openGraph = `<meta property="og:title" content="${data.title}">
                    <meta property="og:type" content="website">
                    <meta property="og:description" content="${data.desc}">
                    <meta property="og:url" content="${data.url}">
                    <meta property="og:image" content="${data.img}">
                    <meta property="og:image:alt" content="${data.img_alt}">\n`;
                const twitterCard = `<meta name="twitter:card" content="${data.twitter_card_type ? data.twitter_card_type : 'summary'}">
                    <meta name="twitter:site" content="@${data.twitter_handle}">
                    <meta name="twitter:title" content="${data.title}">
                    <meta name="twitter:description" content="${data.desc}">
                    <meta name="twitter:image" content="${data.img}">
                    <meta name="twitter:image:alt" content="${data.img_alt}">\n`;
                const canonical = `<link rel="canonical" href="${data.url}">`;

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