module.exports = {
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/client/test/setupTests.js',
    'jest-localstorage-mock',
    '<rootDir>/client/test/__setups__/localstorage.js'
  ],
  collectCoverageFrom: ['**/client/src/**/*.{js,jsx}'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // roots: ['client'],
  coveragePathIgnorePatterns: [
    // 'client/src/components/HOC/',
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
    // 'client/src/containers/validator',
    // 'client/src/app.jsx',
    // 'client/src/store.js',
    // 'client/src/containers/Profile/helper.js',
    // 'client/src/playground',
    // 'client/src/components/HOC/',
    // 'client/src/components/CountryList.js'
  ],
  verbose: false
};
