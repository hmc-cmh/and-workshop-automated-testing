module.exports = {
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'import',
    'jest'
  ],
  env: {
    node: true,
    'jest/globals': true
  }
};