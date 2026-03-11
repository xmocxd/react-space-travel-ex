module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '**/*.test.cjs',
  ],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.cjs',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg|ico)$': '<rootDir>/src/__mocks__/fileMock.cjs',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(nanoid)/)',
  ],
};
