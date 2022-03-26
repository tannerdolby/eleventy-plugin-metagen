module.exports = (eleventyConfig, pluginNamespace) => {
    eleventyConfig.namespace(pluginNamespace, () => {
        eleventyConfig.addShortcode("metagen", (data) => {
            if (data) {
                const metadata = `<meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    ${handleDnsResolution(data)}
                    <title>${data.title}</title>
                    <meta name="author" content="${data.name}">
                    <meta name="title" content="${data.title}">
                    <meta name="description" content="${data.desc}">
                    <meta name="robots" content="${data.robots}">
                    ${handleCustomCrawlers(data)}
                    <meta name="generator" content="${data.generator}">\n`;
                const openGraph = `${data.comments ? `${(data.og_comment ? `<!-- ${data.og_comment} -->` : '<!-- Open Graph -->')}` : ''}
                    <meta property="og:type" content="${getAttr(data.type, 'website')}">
                    <meta property="og:url" content="${data.url}">
                    <meta property="og:site_name" content="${data.site_name}">
                    <meta property="og:locale" content="${getAttr(data.locale, 'en_US')}">
                    <meta property="og:title" content="${data.og_title || data.title}">
                    <meta property="og:description" content="${data.og_desc || data.desc}">
                    <meta property="og:image" content="${data.img}">
                    <meta property="og:image:alt" content="${data.img_alt}">
                    <meta property="og:image:width" content="${data.img_width}">
                    <meta property="og:image:height" content="${data.img_height}">\n`;
                const twitterCard = `${data.comments ? `${(data.twitter_comment ? `<!-- ${data.twitter_comment} -->` : '<!-- Twitter -->')}` : ''}
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:card" content="${getAttr(data.twitter_card_type, 'summary')}">
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:site" content="@${data.twitter_handle}">
                    ${getAttr(data.twitter_card_type, undefined, ["summary_large_image", `<meta ${getAttr(data.attr_name, 'name')}="twitter:creator" content="@${getAttr(data.creator_handle, data.twitter_handle)}">`])}
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:url" content="${data.url}">
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:title" content="${data.twitter_title || data.title}">
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:description" content="${data.twitter_desc || data.desc}">
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:image" content="${data.img}">
                    <meta ${getAttr(data.attr_name, 'name')}="twitter:image:alt" content="${data.img_alt}">\n`;
                const canonical = `<link rel="canonical" href="${data.url}">`;

                function getAttr(prop, fallback, c=null) {
                    if (c && typeof c == 'object' && c[0] == 'summary_large_image') {
                        return prop == c[0] ? c[1] : fallback
                    }
                    return prop ? prop : fallback;
                }

                function getDnsTags(data, rel) {
                    if (typeof data == "string") {
                        return `<link rel="${rel}" href="${data}">`
                    } else if (typeof data == "object") {
                        let tags = "";
                        data.forEach(link => {
                           tags += "\n" + `<link rel="${rel}" href="${link}">`;
                        });
                        return tags;
                    }
                }

                function handleCustomCrawlers(data) {
                    if (data.crawlers && typeof data.crawlers === "object" && data.constructor === Object) {
                        let tags = "";
                        for (const key in data.crawlers) {
                            tags += `\n<meta name="${key}" content="${data.crawlers[key]}">`;
                        }
                        return tags;
                    }
                }

                function handleDnsResolution(data) {
                    let tags = "";
                    if (data.preconnect) tags += "\n" + getDnsTags(data.preconnect, "preconnect");
                    if (data.dns_prefetch) tags += "\n" + getDnsTags(data.dns_prefetch, "dns-prefetch");
                    return tags;
                }

                const output = metadata.concat(openGraph, twitterCard, canonical).split("\n");
                const validTags = output.filter(tag => tag.includes("undefined") === false);
                const cleanOutput = validTags.join("\n").replace(/^\s+|[,]$/gm, "");

                return cleanOutput;
            } else {
                console.error("No data was added into the meta generator")
                return "";
            }
        });
   });
};