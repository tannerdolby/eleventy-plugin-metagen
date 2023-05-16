const getTag = require('get-tag');

function twitterHandle(handle) {
  if (!handle) return '';
  return `@${handle}`;
}

function isObject(obj) {
  return obj && typeof obj === 'object' && obj.constructor === Object;
}

function comments(data, key, commentGroup) {
  if (!data.comments) return '';
  return `${data[key] ? `<!-- ${data[key]} -->` : `<!-- ${commentGroup} -->`}`;
}

function getDnsTags(data, rel) {
  if (typeof data === 'string') {
    return getTag('link', null, { rel: rel, href: data });
  } else if (Array.isArray(data)) {
    return data
      .map((link) => {
        if (typeof link === 'string') {
          return getTag('link', null, { rel: rel, href: link });
        } else if (isObject(link)) {
          return `<link rel="${rel}" href="${link.url}" ${
            link.crossorigin && 'crossorigin'
          }>`;
        }
      })
      .join('\n\t');
  }
}

function handleDnsResolution(data) {
  const tags = [
    getDnsTags(data.preconnect, 'preconnect'),
    getDnsTags(data.dns_prefetch, 'dns-prefetch'),
  ].filter(Boolean);
  return tags.length && tags.join('\n\t');
}

function handleCustomCrawlers(data) {
  if (isObject(data.crawlers)) {
    const tags = [];
    for (const key in data.crawlers) {
      tags.push(getTag('meta', null, { name: key, content: data.crawlers[key] }));
    }
    return tags.join('\n\t');
  }
}

function handleAlternateLocales(locales) {
  if (!locales) return '';
  return locales
    .map((locale) =>
      getTag('meta', null, {
        property: 'og:locale:alternate',
        content: locale,
      }),
    )
    .join('\n\t');
}
function getAttributes(str) {
  if (typeof str != 'string') return '';
  const attributes = str.split(':');
  let attrs = '';
  attributes.slice(1).forEach((attr) => {
    attrs += `${attr} `;
  });
  return [attributes[0], attrs];
}

function getStaticAssets(tagsObj) {
  return Object.entries(tagsObj)
    .filter((tagInfo) => tagInfo[1])
    .map(([tag, val]) => {
      switch (tag) {
        case 'inline-css':
          return `\t${getTag('style', val)}`;
        case 'inline-js':
          if (typeof val === 'string') {
            return `\t${getTag('script', val)}`;
          } else if (Array.isArray(val)) {
            const scripts = val
              .map((v) => {
                if (typeof v === 'string') {
                  return getTag('script', v);
                } else if (isObject(v)) {
                  const { js } = v;
                  delete v.js;
                  return getTag('script', js, v);
                }
              })
              .join('\n\t');

            return `\t${scripts}`;
          }
        case 'css':
          if (Array.isArray(val)) {
            return val
              .map((v) => {
                const [href, attrs] = getAttributes(v);
                if (!attrs) {
                  return getTag('link', null, {
                    rel: 'stylesheet',
                    href: href,
                  });
                } else {
                  return `<link ${attrs.trim()} href="${href}">`;
                }
              })
              .join('\n\t');
          }
        case 'js':
          return val
            .map((v) => {
              const [src, attrs] = getAttributes(v);
              if (!attrs) {
                return `<script src="${src}"></script>`;
              } else {
                return `<script src="${src}" ${attrs.trim()}></script>`;
              }
            })
            .join('\n\t');
      }
    });
}

module.exports = (eleventyConfig, pluginNamespace) => {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addShortcode('metagen', (data) => {
      if (data) {
        const metadata = Object.entries({
          charset: getTag('meta', null, {
            charset: data.charset || 'utf-8',
          }),
          'http-equiv': getTag('meta', null, {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          }),
          viewport: 'width=device-width, initial-scale=1',
          title: data.title && getTag('title', data.title),
          dns: handleDnsResolution(data),
          author: data.name,
          description: data.desc || data.description,
          robots: data.robots,
          crawlers: handleCustomCrawlers(data),
          generator: data.generator,
        })
          .filter((tagInfo) => tagInfo[1])
          .map(([tag, val]) =>
            ['charset', 'dns', 'crawlers', 'http-equiv', 'title'].includes(tag)
              ? val
              : getTag('meta', null, {
                  name: tag,
                  content: val,
                }),
          );

        const openGraph = Object.entries({
          comments: comments(data, 'og-comment', 'Open Graph'),
          'og:type': data.type || 'website',
          'og:url': data.url,
          'og:site_name': data.site_name,
          'og:video': data.og_video,
          'og:audio': data.og_audio,
          'og:determiner': data.og_determiner,
          'og:locale:alternate': handleAlternateLocales(data.og_alternate_locales),
          'og:locale': data.locale || 'en_US',
          'og:title': data.og_title || data.title,
          'og:description': data.og_desc || data.desc || data.description,
          'og:image': data.img || data.image,
          'og:image:alt': data.img_alt || data.image_alt,
          'og:image:width': data.img_width || data.image_width,
          'og:image:height': data.img_height || data.image_height,
          'og:image:type': data.og_img_type || data.og_image_type,
          'og:image:secure_url': data.og_secure_img_url || data.og_secure_image_url,
        })
          .filter((tagInfo) => tagInfo[1])
          .map(([tag, val]) =>
            ['comments', 'og:locale:alternate'].includes(tag)
              ? val
              : getTag('meta', null, { property: tag, content: val }),
          );

        const twitterCard = Object.entries({
          comments: comments(data, 'twitter-comment', 'Twitter'),
          'twitter:card': data.twitter_card_type || 'summary',
          'twitter:site': twitterHandle(data.twitter_handle),
          'twitter:creator': twitterHandle(data.creator_handle || data.twitter_handle),
          'twitter:url': data.url,
          'twitter:title': data.twitter_title || data.title,
          'twitter:description': data.twitter_desc || data.desc || data.description,
          'twitter:image': data.img || data.image,
          'twitter:image:alt': data.img_alt || data.image_alt,
        })
          .filter((tagInfo) => tagInfo[1])
          .map(([tag, val]) =>
            tag === 'comments'
              ? val
              : getTag('meta', null, {
                  [data.attr_name || 'name']: tag,
                  content: val,
                }),
          );

        let canonical, css, js, customTags = '';

        if (data.url) {
          canonical = getTag('link', null, {
            rel: 'canonical',
            href: data.url,
          });
        }

        if (data.css || data.inline_css) {
          css = getStaticAssets({ css: data.css, 'inline-css': data.inline_css }).join(
            '\n',
          );
        }

        if (data.js || data.inline_js) {
          js = getStaticAssets({ js: data.js, 'inline-js': data.inline_js }).join('\n');
        }

        if (data.custom) {
          customTags = data.custom
            .map((item) => {
              return getTag(item.tag, item.text, item.attrs, item.selfClosing || false);
            })
            .join('\n\t');
        }

        const tags = [
          ...metadata,
          ...openGraph,
          ...twitterCard,
          canonical,
          customTags,
          css,
          js,
        ].filter(Boolean);

        return data.minified
          ? tags.join('').replace(/[\n|\n\t]/gm, '')
          : tags.join('\n\t');
      } else {
        console.error('No data was added into the meta generator');
        return '';
      }
    });
  });
};
