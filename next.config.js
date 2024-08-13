require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  env: {
    SETTINGS_STORAGE_KEY: "APP_SETTINGS",
    TOKEN_STORAGE_KEY: "client_token",
    HOST_API: process.env.HOST_API,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  },
});
