/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      useESM: true,
    }],
  },  
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transformIgnorePatterns: [
    "/node_modules/(?!your-esm-package)/",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],  
};
