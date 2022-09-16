module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/models/index.js'],
}
