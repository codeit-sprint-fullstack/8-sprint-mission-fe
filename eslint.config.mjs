// eslint.config.mjs
import js from "@eslint/js";
import next from "eslint-config-next";
import prettier from "eslint-config-prettier";
import unused from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  next, // Next/React 권장 규칙
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "unused-imports": unused },
    rules: {
      // 품질 규칙
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // import 정리(원하면 사용)
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // 포맷 관련 규칙은 두지 않습니다(Prettier 담당)
    },
  },
  // 마지막에 배치해야 Prettier가 포맷 규칙을 꺼줍니다
  prettier,
];
