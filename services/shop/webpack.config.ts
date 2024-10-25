import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { buildWebpack } from "@packages/build-config";
import { BuildMode, BuildPaths, BuildPlatform } from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables{
  analyzer?: boolean;
  mode?: BuildMode;
  port?: number
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
    icon: path.resolve(__dirname, "public", "favicon.ico")
  }

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3001,
    paths, 
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop"
  })

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: "shop",
    filename: "remoteEntry.js",
    exposes: {
      './Router': './src/router/Router.tsx',
      './Button': './src/components/Button/Button.tsx'
    },
    shared:{
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies.react
      },
      "react-dom": {
        eager: true,
        requiredVersion: packageJson.dependencies["react-dom"]
      },
      "react-router-dom": {
        eager: true,
        requiredVersion: packageJson.dependencies["react-router-dom"]
      }
    }
  }))

  return config
};
