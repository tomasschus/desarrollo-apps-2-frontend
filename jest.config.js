/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-transform-stub",
    "^../components/ui/toaster$":
      "<rootDir>/src/components/ui/__mocks__/toaster.tsx",
    "^../../components/ui/toaster$":
      "<rootDir>/src/components/ui/__mocks__/toaster.tsx",
    "^../../../components/ui/toaster$":
      "<rootDir>/src/components/ui/__mocks__/toaster.tsx",
    "^.*/config/api.config$": "<rootDir>/src/__mocks__/api.config.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.(ts|tsx|js)",
    "<rootDir>/src/**/*.(test|spec).(ts|tsx|js)",
    "<rootDir>/src/tests/**/*.(test|spec).(ts|tsx|js)",
  ],
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/config/**/*.{ts,tsx}",
    "src/contexts/**/*.{ts,tsx}",
    "src/hooks/**/*.{ts,tsx}",
    "src/modules/**/*.{ts,tsx}",
    "!src/utils/**/*",
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
