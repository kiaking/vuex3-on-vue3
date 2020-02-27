module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.ts'],
  watchPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  rootDir: __dirname,
  testMatch: ['<rootDir>/__tests__/**/*spec.ts']
}
