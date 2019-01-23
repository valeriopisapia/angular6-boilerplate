/**
 * @author: Valerio Pisapia <pisa.vale@gmail.com>
 */
const helpers = require("./helpers");
const buildUtils = require("./build-utils");

/**
 * Used to merge webpack configs
 */
const webpackMerge = require("webpack-merge");

/**
 * The settings that are common to prod and dev
 */
const commonConfig = require("./webpack.common.js");

/**
 * Webpack Plugins
 */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HashedModuleIdsPlugin = require("webpack/lib/HashedModuleIdsPlugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

/***
 * Ref: https://github.com/mishoo/UglifyJS2/tree/harmony#minify-options
 * @param supportES2015
 * @param enableCompress disabling compress could improve the performance, see https://github.com/webpack/webpack/issues/4558#issuecomment-352255789
 * @returns {{ecma: number, warnings: boolean, ie8: boolean, mangle: boolean, compress: {pure_getters: boolean, passes: number}, output: {ascii_only: boolean, comments: boolean}}}
 */
function getUglifyOptions(supportES2015, enableCompress) {
  const uglifyCompressOptions = {
    pure_getters: true /* buildOptimizer */,
    // PURE comments work best with 3 passes.
    // See https://github.com/webpack/webpack/issues/2899#issuecomment-317425926.
    passes: 2 /* buildOptimizer */
  };

  return {
    ecma: supportES2015 ? 6 : 5,
    warnings: false, // TODO verbose based on option?
    ie8: false,
    mangle: true,
    compress: enableCompress ? uglifyCompressOptions : false,
    output: {
      ascii_only: true,
      comments: false
    }
  };
}

module.exports = function(env) {
  const isProd = process.env.NODE_ENV === "production";
  const APP_CONFIG = require(process.env.ANGULAR_CONF_FILE ||
    (isProd ? "./config.prod.json" : "./config.dev.json"));
  const ENV = (process.env.NODE_ENV = process.env.ENV = "production");
  const supportES2015 = buildUtils.supportES2015(
    buildUtils.DEFAULT_METADATA.tsConfigPath
  );
  const sourceMapEnabled = process.env.SOURCE_MAP === "1";
  const METADATA = Object.assign({}, buildUtils.DEFAULT_METADATA, {
    host: APP_CONFIG.HOST || "localhost",
    port: APP_CONFIG.PORT || 8080,
    ENV: ENV,
    HMR: false
  });

  const entry = {
    // polyfills: "./src/polyfills.browser.ts",
    // main: "./src/main.browser.ts",
    singleSpaEntry: "./src/singleSpaEntry.ts"
  };

  const ASSET_PATH = APP_CONFIG.ASSET_PATH || "/";

  // set environment suffix so these environments are loaded.
  METADATA.envFileSuffix = METADATA.E2E ? "e2e.prod" : "prod";

  return webpackMerge(
    commonConfig({ env: ENV, metadata: METADATA, entry: entry }),
    {
      mode: "production",

      devtool: "source-map",

      /**
       * Options affecting the output of the compilation.
       *
       * See: https://webpack.js.org/configuration/output/
       */
      output: {
        publicPath: ASSET_PATH,
        /**
         * The output directory as absolute path (required).
         *
         * See: https://webpack.js.org/configuration/output/#output-path
         */
        path: helpers.root("dist"),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: https://webpack.js.org/configuration/output/#output-filename
         */
        filename: "[name].bundle.js",

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: https://webpack.js.org/configuration/output/#output-sourcemapfilename
         */
        sourceMapFilename: "[file].map",

        /**
         * The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         * See: https://webpack.js.org/configuration/output/#output-chunkfilename
         */
        chunkFilename: "[name].[chunkhash].chunk.js",

        /**
         * IMPORTANT
         * https://github.com/CanopyTax/single-spa/issues/133 -> libraryTarget has to be "amd" or "umd" in order to Sigle-SPA is able to understand the lifecycle hooks
         */
        library: "ac_[name]",
        libraryTarget: "umd"
      },

      module: {
        rules: [
          /**
           * Extract CSS files from .src/styles directory to external CSS file
           */
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
            include: [helpers.root("src", "styles")]
          },

          /**
           * Extract and compile SCSS files from .src/styles directory to external CSS file
           */
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            include: [helpers.root("src", "styles")]
          }
        ]
      },

      optimization: {
        /**
         * Plugin: SplitChunksPlugin
         * Description: https://webpack.js.org/plugins/split-chunks-plugin/
         */
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
            }
          }
        },
        minimizer: [
          /**
           * Plugin: UglifyJsPlugin
           * Description: Minimize all JavaScript output of chunks.
           * Loaders are switched into minimizing mode.
           *
           * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
           *
           * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
           */
          new UglifyJsPlugin({
            sourceMap: sourceMapEnabled,
            parallel: true,
            cache: helpers.root("webpack-cache/uglify-cache"),
            uglifyOptions: getUglifyOptions(supportES2015, true)
          })
        ]
      },

      /**
       * Add additional plugins to the compiler.
       *
       * See: https://webpack.js.org/configuration/plugins/
       */
      plugins: [
        new MiniCssExtractPlugin({
          filename: "[name]-[hash].css",
          chunkFilename: "[name]-[chunkhash].css"
        }),
        new HashedModuleIdsPlugin()
      ],

      /**
       * Include polyfills or mocks for various node stuff
       * Description: Node configuration
       *
       * See: https://webpack.js.org/configuration/node/
       */
      node: {
        global: true,
        crypto: "empty",
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        fs: "empty"
      }
    }
  );
};
