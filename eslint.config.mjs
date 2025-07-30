import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // تجاهل جميع التحذيرات والأخطاء
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // تجاهل جميع التحذيرات
      "no-console": "off",
      "no-debugger": "off",
      "no-unused-vars": "off",
      "prefer-const": "off",
      "no-var": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-unreachable": "off",
      "no-constant-condition": "off",
      "no-empty": "off",
      "no-empty-function": "off",
      "no-extra-semi": "off",
      "no-irregular-whitespace": "off",
      "no-multiple-empty-lines": "off",
      "no-trailing-spaces": "off",
      "no-unused-labels": "off",
      "no-useless-escape": "off",
      "no-useless-return": "off",
      "prefer-promise-reject-errors": "off",
      "require-await": "off",
      "valid-typeof": "off",
    },
  },
];

export default eslintConfig;
