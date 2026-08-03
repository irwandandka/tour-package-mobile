module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-worklets/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@app": "./src/app",
            "@features": "./src/features",
            "@navigation": "./src/navigation",
            "@shared": "./src/shared",
            "@i18n": "./src/i18n",
            "@store": "./src/store",
          },
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
        },
      ],
    ],
  };
};
