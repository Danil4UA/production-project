import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import i18next from 'eslint-plugin-i18next';
import pluginReactHooks from "eslint-plugin-react-hooks"; // Use import for React Hooks plugin

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
                ...globals.browser, // Add browser environment
                localStorage: true,
                fetch: true,
                __IS__DEV__: true,
                __API__: true,
                jest: true, // For Jest tests
            },
        },
        plugins: {
            "@typescript-eslint": tseslintPlugin,
            react: pluginReact,
            "react-hooks": pluginReactHooks, // Use imported React Hooks plugin
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
            "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
            "react-hooks/exhaustive-deps": "error", // Checks effect dependencies
            "react/display-name": "off"
        },
    },
];