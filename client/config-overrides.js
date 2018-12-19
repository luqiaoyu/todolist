const { injectBabelPlugin } = require('react-app-rewired');

const WebpackPluginImport = require('webpack-plugin-import');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {
    libraryName: '@icedesign/base'
  }], config);

  config.plugins.push(
    new WebpackPluginImport([
      {
        libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
        stylePath: 'style.js',
      },
      {
        libraryName: /@icedesign\/.*/,
        stylePath: 'style.js',
      },
    ])
  );

  return config;
}
