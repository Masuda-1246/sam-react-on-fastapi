import { defineConfig } from "orval";

/**
 * Orval Configuration
 * @see https://orval.dev/reference/configuration/overview
 */
export default defineConfig({
  petstore: {
    input: {
      target: "../backend/openapi.json",
    },
    output: {
      mode: "split",
      target: "./src/api/generated",
      schemas: "./src/api/model",
      client: "react-query",
      clean: true,
      override: {
        query: {
          useQuery: true,
          useInfinite: false,
        },
        // mutator: {
        //   path: './src/api/mutator/custom-instance.ts',
        //   name: 'customInstance',
        // },
      },
    },
  },
});
