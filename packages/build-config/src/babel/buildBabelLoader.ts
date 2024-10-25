import { BuildOptions } from "../types/types";
import { removeDataTestIdPlugin } from "./removeDataTestIdPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          [
            "@babel/preset-react",
            {
              runtime: isDev ? "automatic" : "classic",
            },
          ],
          "@babel/preset-typescript",
        ],
        plugins: [
          [
            removeDataTestIdPlugin,
            {
              props: ["data-testid"],
            },
          ],
        ],
      },
    },
  };
}
