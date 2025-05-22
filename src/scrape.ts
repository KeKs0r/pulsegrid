import { makeClient } from "./make-client";

const client = makeClient();

const response = await client.GET("/public_power", {
  params: {
    query: {
      start: "2025-05-21T00:00:00.000Z",
      end: "2025-05-21T23:59:59.999Z",
      country: "pl",
    },
  },
});

if (response.error) {
  console.error(response.error);
} else {
  const seconds = response.data.unix_seconds;
  console.log("Data Points", seconds?.length);
}
