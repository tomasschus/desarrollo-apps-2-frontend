/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '^../components/ui/toaster$':
      '<rootDir>/src/core/components/ui/__mocks__/toaster.tsx',
    '^../../components/ui/toaster$':
      '<rootDir>/src/core/components/ui/__mocks__/toaster.tsx',
    '^../../../components/ui/toaster$':
      '<rootDir>/src/core/components/ui/__mocks__/toaster.tsx',
    '^.*/config/api.config$': '<rootDir>/src/__mocks__/api.config.ts',
    '^@lottiefiles/dotlottie-react$':
      '<rootDir>/src/__mocks__/dotlottie-react.tsx',
    '\\.(lottie)$': '<rootDir>/src/__mocks__/lottie-file.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['<rootDir>/src/test/**/*.(test|spec).(ts|tsx|js)'],
  collectCoverageFrom: ['src/core/**/*.{ts,tsx}'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
};
