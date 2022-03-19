module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./src"],
  snapshotResolver: "./snapshotResolver.js",
};
