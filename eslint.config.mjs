import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import i18next from 'eslint-plugin-i18next';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    i18next.configs['flat/recommended'],
    {
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        languageOptions: {
            parser: tseslintParser, // Use the TypeScript parser
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
                ...globals.browser, // добавляем browser окружение
                "localStorage": true,
                "fetch": true,
                "__IS__DEV__": true,
                "jest": true, // для тестов jest
            },
        },
        plugins: {
            "@typescript-eslint": tseslintPlugin,
            react: pluginReact,
        },
        rules: {
            ...pluginJs.configs.recommended.rules, // JavaScript recommended rules
            ...tseslintPlugin.configs.recommended.rules, // TypeScript recommended rules
            ...pluginReact.configs.flat.recommended.rules, // React recommended rules
            // Custom rules
            "react/jsx-indent": [2, 4],
            indent: [2, 4],
            "no-unused-vars": "warn",
            "react/react-in-jsx-scope": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "react/no-deprecated": "warn",
            "no-undef": "warn",
        },
    },
];