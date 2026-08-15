import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
import globals from 'globals'
import { globalIgnores } from 'eslint/config'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,tsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2022,
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'eqeqeq': ['warn', 'always'],
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'prefer-template': 'warn',
      'no-restricted-globals': [
        'error',
        { name: 'isNaN', message: 'Use Number.isNaN instead.' },
        { name: 'isFinite', message: 'Use Number.isFinite instead.' },
      ],
      // TypeScript specific
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
      '@typescript-eslint/consistent-type-definitions': 'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-dynamic-delete': 'warn',
      'prefer-object-has-own': 'error',
      'no-prototype-builtins': 'error',
      'no-implied-eval': 'error',
    },
  },

  globalIgnores(['**/dist/**', '**/node_modules/**', '**/public/**']),

  // Vue essential rules
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  // @ts-expect-error - types error
  ...vueI18n.configs.recommended,
  {
    settings: {
      'vue-i18n': {
        localeDir: 'src/i18n/locales/en.json',
        messageSyntaxVersion: '^11.0.0',
      },
    },
    rules: {
      '@intlify/vue-i18n/no-missing-keys': 'error',
      '@intlify/vue-i18n/no-unused-keys': ['error', {
        src: './src',
        extensions: ['.vue', '.ts'],
        ignores: ['/^languages\\./'],
      }],
      '@intlify/vue-i18n/no-raw-text': ['error', {
        ignoreNodes: ['i', 'v-icon'],
      }],
      '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'warn',
    },
  },
  // Vue specific overrides
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': ['error', { shallowOnly: true }],
      'vue/require-v-for-key': 'error',
      'vue/no-reserved-component-names': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-v-text-v-html-on-component': 'warn',
    },
  },
)
