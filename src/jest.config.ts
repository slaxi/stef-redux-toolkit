import type { Config } from "jest";

const config: Config = {
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
  collectCoverage: true,
  testEnvironment: "jsdom",
};

export default config;
