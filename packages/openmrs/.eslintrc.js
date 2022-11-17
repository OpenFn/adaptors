module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'comma-dangle': ['error', 'never']
  },
  globals: {
    alterState: 'readonly',
    execute: 'readonly',
    field: 'readonly',
    fields: 'readonly',
    dataValue: 'readonly',
    dataPath: 'readonly',
    create: 'readonly',
    update: 'readonly',
    upsert: 'readonly',
    relationship: 'readonly',
    createIf: 'readonly',
    bulk: 'readonly',
    each: 'readonly',
    combine: 'readonly'
  }
};
