import { defineConfig } from '@soybeanjs/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
  { vue: true, unocss: true },
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', '[id]']
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          ignores: ['/^icon-/']
        }
      ]
    },
    plugins: {
      eslintConfigPrettier
    }
  }
);
