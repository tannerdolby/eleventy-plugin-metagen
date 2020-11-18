const CacheAsset = require("@11ty/eleventy-cache-assets");

module.exports = (eleventyConfig) => {
    // Create shortcode for generating meta tags
    eleventyConfig.addShortcode("metagen", (data) => {
        console.log(data);

        if (data) {
            const openGraphTags = `<meta name="og:url" content="${data.url}">
                <meta name="og:type" content="website">
                <meta name="og:title" content="${data.title}">
                <meta name="og:description" content="${data.desc}">
                <meta name="og:img" content="${data.url.concat(data.img)}">
                <meta name="og:img:alt" content="${data.img_alt}">\n`.replace(/^\s+/gm, "\t");
            const twitterTags = `
                <meta name="twitter:card" content="summary">
                <meta name="twitter:site" content="${data.twitterHandle}">
                <meta name="twitter:url" content="${data.url}">
                <meta name="twitter:title" content="${data.title}">
                <meta name="twitter:description" content="${data.desc}">
                <meta name="twitter:image" content="${data.url.concat(data.img)}">
                <meta name="twitter:image:alt" content="${data.img_alt}">`.replace(/^\s+/gm, "\t");
            
            return openGraphTags + twitterTags;
        } else {
            // Open Graph Data
            const openGraphTags = `
                <meta property="og:url" content="">
                <meta property="og:type" content="website">
                <meta property="og:title" content="">
                <meta property="og:description" content="">
                <meta property="og:img" content="">`.replace(/^\s+/gm, "\t");

            // Twitter Summary Card
            const twitterTags = `
                <meta name="twitter:card" content="summary">
                <meta property="twitter:site" content="">
                <meta property="twitter:url" content="">
                <meta name="twitter:title" content="">
                <meta name="twitter:description" content="Add Search to a Static Site using Custom Data Attributes">
                <meta name="twitter:image" content="">`.replace(/^\s+/gm, "\t");

            return openGraphTags + twitterTags;
        }


        // return allTags;
    });
};
/*
module.exports = (eleventyConfig, pluginName) => {
    eleventyConfig.namespace(pluginName, () => {
        eleventyConfig.addShortCode('metaGenerate', (data) => {

            console.log(data);

            // use opengraph API and eleventy-cache-assets
            // to check and see if site already has meta tags for open graph
            // look into twitter card API to check that api request as well
            // return data or <Promise{ title: bla, key: bla }>
            const check = async function() {
                try {
                    // use data.url for cacheAsset URL
                    let json = await CacheAsset("", {
                        duration: "1d",
                        type: "json"
                    });
                    return {
                        og_url: "",
                        og_title: "",
                        og_description: "",
                        og_image: "",
                        og_image_alt: ""
                    }
                } catch (e) {
                    console.log(`Failed to get open graph API data for URL: `);
                    return {
                        og_url: "",
                        og_title: "",
                        og_description: "",
                        og_image: "",
                        og_image_alt: ""
                    }
                }
            };

        

            const openGraphTags = `
            <meta property="og:url" content="https://tannerdolby.com/writing/add-search-to-a-static-site-using-custom-data-attributes/">
            <meta property="og:type" content="website">
            <meta property="og:title" content="Writing - tannerdolby.com">
            <meta property="og:description" content="Add Search to a Static Site using Custom Data Attributes">
            <meta property="og:image" content="">
            `;
            const facebookTags = `
            <meta name="twitter:card" content="summary_large_image">
            <meta property="twitter:domain" content="tannerdolby.com">
            <meta property="twitter:url" content="https://tannerdolby.com/writing/add-search-to-a-static-site-using-custom-data-attributes/">
            <meta name="twitter:title" content="Writing - tannerdolby.com">
            <meta name="twitter:description" content="Add Search to a Static Site using Custom Data Attributes">
            <meta name="twitter:image" content="">`
        });
    });
};
*/