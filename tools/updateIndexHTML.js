// updateIndexHTML.js

function updateIndexHTML() {
  this.test = /<script src=\"\/index.js"><\/script>/;
}

updateIndexHTML.prototype.apply = function(compiler) {
  const test = this.test;
  compiler.plugin("compilation", function(compilation) {
    // Hook into html-webpack-plugin event
    compilation.plugin('html-webpack-plugin-before-html-processing', function(pluginData, cb) {
      pluginData.html = pluginData.html.replace(test, '');
      cb(null, pluginData);
    });
  });
};

module.exports = updateIndexHTML;
