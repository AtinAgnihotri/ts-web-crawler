export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/**/__tests__/**/*.(spec|test).ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: [
    "node_modules",
    "src/database",
    "src/test",
    "src/types",
    "dist",
  ],
  reporters: ["default"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
