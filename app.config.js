import "dotenv/config";

const ENV = {
  API_URL: process.env.API_URL,
  API_KEY: process.env.API_KEY,
  SOCKET_URL: process.env.SOCKET_URL,
};

export default {
  name: "Chill&chat",
  slug: "chill-and-chat-mobile-app",
  version: "1.0.0",
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
    supportsTablet: true,
    bundleIdentifier: "com.chillandchat.chillandchat",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/logo.png",
      backgroundColor: "#ffffff",
    },
    package: "com.chillandchat.chillandchat",
  },
  web: {
    favicon: "./assets/logo.png",
  },
  extra: {
    API_URL: ENV.API_URL,
    API_KEY: ENV.API_KEY,
    SOCKET_URL: ENV.SOCKET_URL,
  },
};
