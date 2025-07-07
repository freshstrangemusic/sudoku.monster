"use strict";

const isProduction = process.env.NODE_ENV === "production";

const plugins = [
  require("autoprefixer"),
  require("postcss-preset-env"),
  require("postcss-nested"),
];

if (isProduction) {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins,
};
