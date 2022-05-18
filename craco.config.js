const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#e52433",
              "@link-color": "#e52433",
              "@layout-header-background": "#1e8efb",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// *dark blue #15528d
