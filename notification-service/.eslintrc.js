module.exports = {
    "plugins": [
      "security",
      "jest"
    ],
    "extends": [
      "airbnb-base",
      "plugin:security/recommended",
      "plugin:node/recommended",
      "plugin:jest/recommended",
    ],
    "env": {
      "jest/globals": true
    }
};
