import nextJest from "next/jest";
import type { Config } from "@jest/types";

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
};

export const createJestConfig = nextJest({
  dir: "./",
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();

  return {
    ...nextJestConfig,
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    setupFiles: ["<rootDir>/__mocks__/global.js"],
    transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window))"],
    moduleNameMapper: {
      "swiper/css*": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.svg$": "<rootDir>/__mocks__/svg.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

module.exports = jestConfig;
