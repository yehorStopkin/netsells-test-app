module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'prettier',
        '@netsells',
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        'jsdoc/match-description': 'off',
    },
};
