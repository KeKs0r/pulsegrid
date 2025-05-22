import createClient from "openapi-fetch";

import type { paths } from "./schema";

export type OpenApiClient = ReturnType<typeof createClient<paths>>;

export function makeClient() {
  const client = createClient<paths>({
    baseUrl: "https://api.energy-charts.info",
  });

  return client;
}
