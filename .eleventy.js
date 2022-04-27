const getTag = require("get-tag");

module.exports = (eleventyConfig, pluginNamespace) => {
    eleventyConfig.namespace(pluginNamespace, () => {
        eleventyConfig.addShortcode("metagen", (data) => {

            function comments(data, key, commentGroup) {
                return data.comments ? `${(data[key] ? `<!-- ${data[key]} -->` : `<!-- ${commentGroup} -->`)}` : "";
            }

            function getDnsTags(data, rel) {
                if (typeof data == "string") {
                    return getTag("link", null, {rel: rel, href: data});
                } else if (typeof data == "object" && typeof data.crawlers === "object" && data.constructor === Object) {
                    let tags = "";
                    data.forEach(link => tags += getTag("link", null, {rel: rel, href: link}));
                    return tags;
                }
            }

            function handleDnsResolution(data) {
                let tags = "";
                if (data.preconnect) tags += getDnsTags(data.preconnect, "preconnect");
                if (data.dns_prefetch) tags += getDnsTags(data.dns_prefetch, "dns-prefetch");
                return tags;
            }

            function handleCustomCrawlers(data) {
                if (data.crawlers && typeof data.crawlers === "object" && data.constructor === Object) {
                    let tags = "";
                    for (const key in data.crawlers) tags += getTag("meta", null, {name: key, content: data.crawlers[key] });
                    return tags;
                }
            }

            function getStaticAssets(tagInfoList, asset) {
                return tagInfoList
                    .filter(tagInfo => tagInfo[1])
                    .map(tagInfo => {
                        if (tagInfo[0] === `inline-${asset}`) {
                            return asset == "css" ? `\t${getTag("style", tagInfo[1])}` : `\t${getTag("script", tagInfo[1])}`;
                        } else {
                            return tagInfo[1].map(tagData => {
                                if (typeof tagData === "object") {
                                    return `<script src="${tagData[0]}" ${tagData[1]}></script>`;
                                }
                                return asset == "css" ? getTag("link", null, {rel: "stylesheet", href: tagData }) : `<script src="${tagData}"></script>`;
                            }).join("\n\t");
                        }
                    });
            }

            if (data) {
                let canonical, css, js, customTags = "";
                const metadata = [
                    ["charset", getTag("meta", null, {charset: data.charset || "utf-8"})],
                    ["http-equiv", getTag("meta", null, { "http-equiv": "X-UA-Compatible", content: "IE=edge" })],
                    ["viewport", "width=device-width, initial-scale=1"],
                    ["dns", handleDnsResolution(data)],
                    ["mainTitle", getTag("title", data.title)],
                    ["author", data.name],
                    ["title", data.title],
                    ["description", data.desc],
                    ["robots", data.robots],
                    ["crawlers", handleCustomCrawlers(data)],
                    ["generator", data.generator]
                ].filter(tagInfo => tagInfo && tagInfo[1]).map(tagInfo => {
                    if (["charset", "dns", "crawlers", "http-equiv", "mainTitle"].includes(tagInfo[0])) return tagInfo[1];
                    return getTag("meta", null, { name: tagInfo[0], content: tagInfo[1] });
                });

                const openGraph = [
                    ["comments", comments(data, "og-comment", "Open Graph")],
                    ["og:type", data.type || "website"],
                    ["og:url", data.url],
                    ["og:site_name", data.site_name],
                    ["og:video", data.og_video],
                    ["og:audio", data.og_audio],
                    ["og:determiner", data.og_determiner],
                    ["og:locale:alternate", data.og_alternate_locales],
                    ["og:locale", data.locale || "en_US"],
                    ["og:title", data.og_title || data.title],
                    ["og:description", data.og_desc || data.desc],
                    ["og:image", data.img],
                    ["og:image:alt", data.img_alt],
                    ["og:image:width", data.img_width],
                    ["og:image:height", data.img_height],
                    ["og:image:type", data.og_img_type],
                    ["og:image:secure_url", data.og_img_url]
                ].filter(tagInfo => tagInfo[1]).map(tagInfo => {
                    if (tagInfo[0] == "og:locale:alternate") {
                        return tagInfo[1].map(locale => {
                            return getTag("meta", null, {property: tagInfo[0], content: locale });
                        }).join("\n\t");
                    }
                    return tagInfo[0] === "comments" ? tagInfo[1] : getTag("meta", null, { property: tagInfo[0], content: tagInfo[1] });
                });
                
                const twitterCard = [
                    ["comments", comments(data, "twitter-comment", "Twitter")],
                    ["twitter:card", data.twitter_card_type || 'summary'],
                    ["twitter:site", `@${data.twitter_handle}`],
                    data.twitter_card_type === "summary_large_image" ? ["twitter:creator", `@${data.creator_handle || data.twitter_handle}`] : "",
                    ["twitter:url", data.url],
                    ["twitter:title", data.twitter_title || data.title],
                    ["twitter:description", data.twitter_desc || data.desc],
                    ["twitter:image", data.img],
                    ["twitter:image:alt", data.img_alt]
                ].filter(tagInfo => tagInfo[1]).map(tagInfo => {
                    return tagInfo[0] === "comments" ? tagInfo[1] : getTag("meta", null, { [data.attr_name || "name"]: tagInfo[0], content: tagInfo[1] });
                });

                if (data.url) canonical = getTag("link", null, {rel: "canonical", href: data.url });
                if (data.css || data.inline_css) css = getStaticAssets([["css", data.css], ["inline-css", data.inline_css]], "css").join("\n");
                if (data.js || data.inline_js) js = getStaticAssets([["js", data.js], ["inline-js", data.inline_js]], "js").join("\n");

                if (data.custom) {
                    customTags = data.custom.map(item => {
                        if (item.length < 3) return;
                        if (item.length === 3) return getTag(item[0], item[1], item[2]);
                        return getTag(item[0], item[1], item[2], item[3]);
                    }).join("\n\t");
                }

                return [...metadata, ...openGraph, ...twitterCard, canonical, customTags, css, js].filter(Boolean).join("\n\t");
            } else {
                console.error("No data was added into the meta generator")
                return "";
            }
        });
    });
};
