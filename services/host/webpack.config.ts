import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { buildWebpack } from "@packages/build-config";
import { BuildMode, BuildPaths, BuildPlatform } from "@packages/build-config";
import packageJSON from './package.json'

interface EnvVariables{
  analyzer?: boolean;
  mode?: BuildMode;
  port?: number
  platform?: BuildPlatform;
  SHOP_REMOTE_URL?: string;
  ABOUT_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {
  
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
    icon: path.resolve(__dirname, "public", "favicon.ico")
  }

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";

  const ABOUT_REMOTE_URL = env.ABOUT_REMOTE_URL ?? "http://localhost:3002";

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    paths, 
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop"
  })

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: "host",
    filename: "remoteEntry.js",
    remotes:{
      about: `about@${ABOUT_REMOTE_URL}/remoteEntry.js`,
      shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`
    },
    shared:{
      ...packageJSON.dependencies,

      react: {
        eager: true,
        requiredVersion: packageJSON.dependencies.react
      },
      "react-dom": {
        eager: true,
        requiredVersion: packageJSON.dependencies["react-dom"]
      },
      "react-router-dom": {
        eager: true,
        requiredVersion: packageJSON.dependencies["react-router-dom"]
      }
    }
  }))

  return config
};
