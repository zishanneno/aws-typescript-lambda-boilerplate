let sourcePath;

module.exports = {
  testPathForConsistencyCheck: "src/index.spec.js",
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    sourcePath = testPath;
    return testPath.replace("src/", "snapshots/") + snapshotExtension;
  },
  resolveTestPath: (snapshotFilePath, snapshotExtension) => sourcePath,
};
