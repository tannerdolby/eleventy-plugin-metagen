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
    });
};