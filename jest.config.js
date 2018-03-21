module.exports = {
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/client/test/setupTests.js',
    'jest-localstorage-mock',
    '<rootDir>/client/test/__setups__/localstorage.js'
  ],
  collectCoverageFrom: ['**/client/src/**/*.{js,jsx}'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: [
    'client/src/containers/validator',
    'client/src/containers/RecipeItem/helperFunctions.js',
    'client/src/containers/Profile/helper.js',
    'client/src/reducers/index.js',
    'client/src/playground',
    'client/src/app.jsx',
    'client/src/store.js',
    'client/src/components/CountryList.js'
  ],
  modulePathIgnorePatterns: [
    'server'
  ],
  verbose: false
};
