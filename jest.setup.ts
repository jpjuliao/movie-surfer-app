import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder in Jest (Node <18)
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_REACT_APP_TMDB_API_KEY: 'test-api-key',
      },
    },
  },
});

jest.mock('./src/utils/env', () => ({
  getTmdbApiKey: () => 'test-api-key',
}));