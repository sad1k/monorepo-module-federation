import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions, runtime } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypecript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const assetsLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const babelLoader = buildBabelLoader(options);

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypecript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [
    assetsLoader,
    scssLoader,
    // babelLoader,
    tsLoader
  ];
}
