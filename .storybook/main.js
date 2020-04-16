const path = require("path");

module.exports = {
  stories: ["../stories/**/*.stories.js"],
  addons: ["@storybook/addon-knobs/register"],
  webpackFinal: async (config, { configType }) => {
    // support Stylus since it’s used by default in VuePress components
    config.module.rules.push({
      test: /\.styl$/,
      use: [
        "vue-style-loader",
        "css-loader",
        {
          loader: "stylus-loader",
          options: {
            import: [
              "~@vuepress/theme-default/styles/config.styl",
              path.resolve("./styles/palette.styl"),
            ],
          },
        },
      ],
      include: [
        path.resolve("~@vuepress/theme-default/styles/"),
        path.resolve("./styles/"),
      ],
    });

    console.log(path.resolve("./styles/palette.styl"));

    // hotwire VuePress aliases
    config.resolve.alias["@parent-theme"] = path.resolve(
      "./node_modules/@vuepress/theme-default/"
    );
    config.resolve.alias["@current-theme"] = path.resolve("./");
    config.resolve.alias["@theme"] = path.resolve("./");

    // Return the altered config
    return config;
  },
};
