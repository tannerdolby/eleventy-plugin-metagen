const metagen = require('meta-generator');

module.exports = (eleventyConfig, pluginNamespace) => {
  eleventyConfig.namespace(pluginNamespace, () => {
    eleventyConfig.addShortcode('metagen', (data) => {
      return metagen(data);
    });
  });
};
