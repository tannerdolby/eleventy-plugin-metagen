const getTag = require("get-tag");

module.exports = (eleventyConfig, pluginNamespace) => {
    eleventyConfig.namespace(pluginNamespace, () => {
        eleventyConfig.addShortcode("metagen", (data) => {
            function get(key, fallback) {
                return data.hasOwnProperty(key) ? data[key] : fallback;
            }

            function comments(data, field, commentGroup) {
                return data.comments ? `${(data[field] ? `<!-- ${data[field]} -->` : `<!-- ${commentGroup}-->`)}` : "";
            }

            function getDnsTags(data, rel) {
                if (typeof data == "string") {
                    return `<link rel="${rel}" href="${data}">`
                } else if (typeof data == "object" && typeof data.crawlers === "object" && data.constructor === Object) {
                    let tags = "";
                    data.forEach(link => tags += `\n<link rel="${rel}" href="${link}">`);
                    return tags;
                }
            }

            function handleDnsResolution(data) {
                let tags = "";
                if (data.preconnect) tags += "\n" + getDnsTags(data.preconnect, "preconnect");
                if (data.dns_prefetch) tags += "\n" + getDnsTags(data.dns_prefetch, "dns-prefetch");
                return tags;
            }

            function handleCustomCrawlers(data) {
                if (data.crawlers && typeof data.crawlers === "object" && data.constructor === Object) {
                    let tags = "";
                    for (const key in data.crawlers) tags += `\n<meta name="${key}" content="${data.crawlers[key]}">`;
                    return tags;
                }
            }

            if (data) {
                const openGraphComments = comments(data, "og_comment", "Open Graph");
                const twitterComments = comments(data, "twitter_comment", "Twitter");
                const canonical = `\n<link rel="canonical" href="${data.url}">`;

                const metadata = [
                    [getTag("meta", null, { charset: get("charset", "utf-8") })], [getTag("meta", null, { "http-equiv": "X-UA-Compatible", content: "IE=edge" })],
                    ["viewport", "width=device-width, initial-scale=1"], [handleDnsResolution(data)], [getTag("title", data.title)], ["author", data.name],
                    ["title", data.title], ["description", data.desc], ["robots", data.robots], [handleCustomCrawlers(data)], ["generator", data.generator]
                ].map((tagInfo, i) => {
                    if ([0, 1, 3, 4, 9].includes(i)) return tagInfo;
                    return getTag("meta", null, { name: tagInfo[0], content: tagInfo[1] });
                }).join("\n");

                const openGraph = openGraphComments.concat("\n", [
                    ["type", get(data.type, 'website')], ["url", data.url], ["site_name", data.site_name], ["locale", get(data.locale, 'en_US')],
                    ["title", data.og_title || data.title], ["description", data.og_desc || data.desc], ["image", data.img], ["image:alt", data.img_alt],
                    ["image:width", data.img_width], ["image:height", data.img_height]
                ].map(tagInfo => {
                    return getTag("meta", null, { property: `og:${tagInfo[0]}`, content: tagInfo[1] });
                }).join("\n"));

                const twitterCard = twitterComments.concat("\n", [
                    ["twitter:card", get("twitter_card_type", "foo")], ["twitter:site", `@${data.twitter_handle}`],
                    data.twitter_card_type == "summary_large_image" ? ["twitter:creator", `@${get("creator_handle", data.twitter_handle)}`] : "",
                    ["twitter:url", data.url], ["twitter:title", data.twitter_title || data.title], ["twitter:description", data.twitter_desc || data.desc],
                    ["twitter:image", data.img], ["twitter:image:alt", data.img_alt]
                ].map(tagInfo => {
                    return getTag("meta", null, { [get("attr_name", "name")]: tagInfo[0], content: tagInfo[1] });
                }).join("\n"));

                const output = metadata.concat(openGraph, twitterCard, canonical).split("\n");
                const cleanOutput = output.filter(Boolean).join("\n").replace(/^\s+|[,]$/gm, "");

                return cleanOutput;
            } else {
                console.error("No data was added into the meta generator")
                return "";
            }
        });
    });
};