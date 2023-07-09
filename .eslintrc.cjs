/* eslint-env node */

module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    // "files": ["**/*.js", "**/*.jsx", "**/*.ts"],
    "extends": [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react-hooks/recommended',
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": 'latest',
        "sourceType": 'module',
        "project": "./tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "plugins": ['react-refresh'],
    "rules": {
        'react-refresh/only-export-components': [
            'warn',
            { "allowConstantExport": true },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
    "ignorePatterns": [".eslintrc.cjs", "vite.config.ts"]
}

