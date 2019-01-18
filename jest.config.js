module.exports = {
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
  setupTestFrameworkScriptFile: "<rootDir>jest/setup/setupEnzyme.js",
  testPathIgnorePatterns: [
    "<rootDir>/jest",
    "<rootDir>/node_modules",
    "<rootDir>/out",
    "<rootDir>/coverage",
  ],
  collectCoverage: process.env.COLLECT_COVERAGE === "true",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!<rootDir>/jest/**",
    "!<rootDir>/out/**",
    "!<rootDir>/coverage/**",
    "!**/node_modules/**",
    "!.next/**",
    "!**//**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
