const config = {
  app: {
    HOST_API: process.env.HOST_API,
  },
  storageKey: {
    SETTINGS: process.env.SETTIGNS_STORAGE_KEY || "settings",
    TOKEN: process.env.TOKEN_STORAGE_KEY || "accessToken",
  },
  languages: ["en", "uz", "ru"],
};

export default config;
