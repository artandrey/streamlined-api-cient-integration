import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',

  input: './api.json',
  output: {
    path: './client',
    clean: true,
  },
});
