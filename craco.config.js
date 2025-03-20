const CracoCSSModules = require('craco-css-modules');

const config = {
  plugins: [
    { plugin: CracoCSSModules }
  ],
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        module: {
          ...webpackConfig.module,
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
            },
          ],
        },
      };
    },
  },
};

module.exports = config;
