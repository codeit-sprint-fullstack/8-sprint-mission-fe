import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  prettier,
  {
    plugins: {
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
    },
  },
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', '.history/**', 'next-env.d.ts'],
  },
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'jsx-a11y/aria-role': 'warn',
      'jsx-a11y/no-static-element-interactions': 'off', // 필요시 조정
      'jsx-a11y/click-events-have-key-events': 'off', // 키보드 핸들 수동 처리 중
    },
  },
];

export default eslintConfig;
