const metagen = require('meta-generator');

module.exports = (eleventyConfig, pluginNamespace) => {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addShortcode('metagen', (data) => {
      const head = metagen(data);
      if (Array.isArray(head)) {
        return head.join('\n');
      } else if (typeof head === 'string') {
        return head;
      } else {
        return '';
      }
    });
  });
};
