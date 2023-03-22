import "dotenv/config";

const ENV = {
  API_URL: process.env.API_URL,
  API_KEY: process.env.API_KEY,
  SOCKET_URL: process.env.SOCKET_URL,
};

export default {
  expo: {
    name: "Chill&chat",
    slug: "chillandchat-mobile",
    version: "1.16.0",
    orientation: "portrait",
    privacy: "public",
    icon: "./assets/logo.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.chillandchat.mobile",
      buildNumber: "14",
      infoPlist: {
        UIBackgroundModes: ["remote-notification"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/logo.png",
        backgroundColor: "#ffffff",
      },
      package: "com.chillandchat.mobile",
    },
    web: {
      favicon: "./assets/logo.png",
    },
    extra: {
      API_URL: ENV.API_URL,
      API_KEY: ENV.API_KEY,
      SOCKET_URL: ENV.SOCKET_URL,
      eas: {
        projectId: "2329a990-f032-4541-8051-e99cb541fdea",
      },
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "Please allow access to your photo library to share it!",
        },
      ],
    ],
  },
};
