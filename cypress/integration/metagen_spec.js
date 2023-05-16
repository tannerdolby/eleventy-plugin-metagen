describe('create document metadata', () => {
  before(() => {
    cy.visit('../../_site/tests/index.html');
  });

  it('<title> tag is generated and matches', () => {
    cy.title().should('eq', 'Eleventy Plugin Meta Generator');
  });

  it('generic meta tags are generated', () => {
    const map = {
      charset: 'utf-8',
      'http-equiv': 'IE=edge',
      viewport: 'width=device-width, initial-scale=1',
      author: 'Tanner Dolby',
      title: 'Eleventy Plugin Meta Generator',
      description: 'An eleventy shortcode for generating meta tags.',
      generator: '11ty',
    };
    cy.get('meta[charset]').should('have.attr', 'charset', 'utf-8');
    cy.get('meta[http-equiv]').should('have.attr', 'http-equiv', 'X-UA-Compatible');
    cy.get('meta[http-equiv]').should('have.attr', 'content', 'IE=edge');
    cy.get(`meta[name='viewport']`).should('have.attr', 'content', map.viewport);
    cy.get('title').should('have.text', map.title);
    cy.get(`meta[name='author']`).should('have.attr', 'content', map.author);
    cy.get(`meta[name='description']`).should('have.attr', 'content', map.description);
    cy.get(`meta[name='generator']`).should('have.attr', 'content', map.generator);
  });

  it('robots tag is generated', () => {
    cy.get(`meta[name='robots']`).should('have.attr', 'content', 'noindex');
  });

  it('preconnect and dns-prefetch tags are generated', () => {
    const map = {
      preconnect: [
        { url: 'https://fonts.googleapis.com/', crossorigin: true },
        'https://google.com',
      ],
      'dns-prefetch': ['https://fonts.googleapis.com/', 'https://google.com'],
    };

    map['preconnect'].forEach((link, i) => {
      if (typeof link === 'string') {
        cy.get(`link[rel='preconnect']`).eq(i).should('have.attr', 'href', link);
      } else {
        cy.get(`link[rel='preconnect']`)
          .should('have.attr', 'href', link.url)
          .should('have.attr', 'crossorigin');
      }
    });

    map['dns-prefetch'].forEach((link, i) => {
      cy.get(`link[rel='dns-prefetch']`).eq(i).should('have.attr', 'href', link);
    });
  });

  it('custom crawler tags are generated', () => {
    const map = {
      googlebot: 'noindex',
      'googlebot-news': 'nosnippet',
    };
    for (const prop in map) {
      cy.get(`meta[name='${prop}']`).should('have.attr', 'content', `${map[prop]}`);
    }
  });

  it('twitter meta tags are generated', () => {
    const map = {
      card: 'summary_large_image',
      site: '@tannerdolby',
      creator: '@tannerdolby',
      url: 'https://tannerdolby.com',
      title: 'Eleventy Plugin Meta Generator',
      description: 'An eleventy shortcode for generating meta tags.',
      image: 'https://tannerdolby.com/images/arch-spiral-large.jpg',
      'image:alt': 'Archimedean Spiral',
    };
    for (const prop in map) {
      cy.get(`meta[name='twitter:${prop}']`).each((el) => {
        cy.get(el).should('have.attr', 'content', map[prop]);
      });
    }
  });

  it('open graph meta tags are generated', () => {
    const map = {
      type: 'website',
      url: 'https://tannerdolby.com',
      locale: 'en_US',
      title: 'Eleventy Plugin Meta Generator',
      description: 'An eleventy shortcode for generating meta tags.',
      image: 'https://tannerdolby.com/images/arch-spiral-large.jpg',
      'image:alt': 'Archimedean Spiral',
    };
    for (const prop in map) {
      cy.get(`meta[property='og:${prop}']`).each((el) => {
        cy.get(el).should('have.attr', 'content', map[prop]);
      });
    }
  });

  it('canonical link generated and matches', () => {
    cy.get(`link[rel='canonical']`).should(
      'have.attr',
      'href',
      'https://tannerdolby.com',
    );
  });

  it('alternate og:locales generated if specified', () => {
    const alternateLocales = ['es', 'zh', 'ja'];
    alternateLocales.forEach((locale, i) => {
      cy.get(`meta[property='og:locale:alternate']`)
        .eq(i)
        .should('have.attr', 'content', locale);
    });
  });

  it('custom user-defined tags generated', () => {
    cy.get(`meta[name='foobar']`).should('have.attr', 'content', 'fizz');
    cy.get(`link[href='print.css']`)
      .should('have.attr', 'rel', 'stylesheet')
      .should('have.attr', 'media', 'print');
    cy.get(`link[href='myFont.woff2']`)
      .should('have.attr', 'rel', 'preload')
      .should('have.attr', 'as', 'font')
      .should('have.attr', 'type', 'font/woff2')
      .should('have.attr', 'crossorigin', 'anonymous');
  });

  it('css stylesheets generated', () => {
    cy.get(`link[href='style.css']`).should('have.attr', 'href', 'style.css');
    cy.get(`link[rel='preload'][href='foo.css']`)
      .should('have.attr', 'href', 'foo.css')
      .should('have.attr', 'as', 'style');
  });

  it('inline-css generated', () => {
    cy.get('style').should('have.text', 'h1 {color: #f06}');
  });

  it('js scripts generated', () => {
    const scripts = ['foo.js', 'bar.js:async:type="module"'];
    scripts.forEach((script, i) => {
      const [src, async] = script.split(':');
      cy.get('script[src]').eq(i).should('have.attr', 'src', src);
      if (script.includes(':async')) {
        cy.get('script[async]')
          .should('have.attr', 'async', async)
          .should('have.attr', 'type', 'module');
      }
    });
  });

  it('inline-js generated', () => {
    cy.get('script:not([src])').eq(1).should('have.text', `console.log("hello, world");`);
    cy.get('script[type="application/json"]')
      .should('have.attr', 'id', 'some-id')
      .should('have.text', '{"data": "hello"}');
  });
});
