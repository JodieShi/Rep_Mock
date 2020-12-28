module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2018
  },
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off",
    quotes: ["error", "double"]
  }
}
