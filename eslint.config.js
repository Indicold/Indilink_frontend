const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");

const compat = new FlatCompat({
    baseDirectory: __dirname,                  // optional; default: process.cwd()
    resolvePluginsRelativeTo: __dirname,       // optional
    recommendedConfig: js.configs.recommended, // optional
    allConfig: js.configs.all,                 // optional
});

module.exports = [

    // mimic environments
    ...compat.env({
        es2020: true,
        node: true
    }),

    // mimic plugins
    ...compat.plugins("react"),

    // translate an entire config
    ...compat.config({
        plugins: ["react"],
        extends: "standard",
        env: {
            es2020: true,
            node: true
        },
        rules: {
            semi: "error"
        }
    })
];
