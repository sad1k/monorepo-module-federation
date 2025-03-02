import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import webpack from 'webpack'
import path from "path";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
  const isDev = mode === "development";

  const plugins: Configuration['plugins'] = [new HtmlWebpackPlugin({
    template:paths.html,
    favicon: paths.icon
  }),
  new webpack.DefinePlugin({
    __PLATFORM__: JSON.stringify(platform),
  }),
  // new ForkTsCheckerWebpackPlugin()
]

  if(isDev){
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(new ReactRefreshPlugin())
  }


  if(!isDev){
    plugins.push(new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }))
   }

  if(analyzer){
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins
}