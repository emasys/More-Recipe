module.exports = {
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/client/test/setupTests.js',
    'jest-localstorage-mock',
    '<rootDir>/client/test/__setups__/localstorage.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  roots: ['client/test'],
  modulePathIgnorePatterns: ['server', 'client/test/components']
};
