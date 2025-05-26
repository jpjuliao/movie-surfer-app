export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};