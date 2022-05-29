module.exports = {
  preset: "ts-jest",
  setupFiles: ["jest-plugin-context/setup"],
  testRegex: ".*-test.tsx?$",
  testEnvironment: "node",
};
