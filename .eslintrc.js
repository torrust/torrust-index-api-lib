module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    parserOptions: {
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        camelcase: "off",
        quotes: [
            "error",
            "double"
        ],
        semi: [
            "error",
            "always"
        ],
        indent: [
            "warn",
            2
        ],
        "no-multi-spaces": [
            "error"
        ]
    }
};
