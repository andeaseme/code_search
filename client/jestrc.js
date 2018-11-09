var fetch = require('isomorphic-fetch');
var WebSocket = require('ws');

module.exports = {
  globals: {
    fetch,
    WebSocket,
    localStorage: { getItem: () => null, setItem: () => null },
    'ts-jest': {
      skipBabel: true
    },
    'process.env': {
      HOST: JSON.stringify('localhost'),
    }
  },
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "/test/.*\\.(test|spec)\\.(ts|tsx|js)$",
  testURL: "https://otosense.ai",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json",
    "jsx"
  ],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/test/CSSStub.js"
  }
};
