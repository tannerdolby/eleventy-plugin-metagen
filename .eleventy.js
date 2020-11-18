module.exports = (eleventyConfig) => {
    // Create shortcode for generating meta tags
    eleventyConfig.addShortcode("metagen", (data) => {

        if (data) {
            
            const canonical = `<link rel="canonical" href="${data.url}">`;

            const metadata = `<meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${data.title}</title>
                <meta name="author" content="${data.name}">\n`.replace(/^\s+/gm, "");

            const openGraph = `
                <meta name="description" content="${data.desc}">
                <meta name="og:title" content="${data.title}">
                <meta name="og:type" content="website">
                <meta name="og:description" content="${data.desc}">
                <meta name="og:url" content="${data.url}">
                <meta name="og:img" content="${data.url.concat(data.img)}">
                <meta name="og:img:alt" content="${data.img_alt}">\n`.replace(/^\s+/gm, "");

            const twitterCard = `
                <meta name="twitter:card" content="summary">
                <meta name="twitter:site" content="${data.twitterHandle}">
                <meta name="twitter:title" content="${data.title}">
                <meta name="twitter:description" content="${data.desc}">
                <meta name="twitter:image" content="${data.url.concat(data.img)}">
                <meta name="twitter:image:alt" content="${data.img_alt}">\n`.replace(/^\s+/gm, "");

            return metadata.concat(openGraph, twitterCard, canonical);

        } else {
            console.log("No data was passed into the meta generator!")
        }
    });
};