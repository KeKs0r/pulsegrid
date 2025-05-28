import { assert } from "es-toolkit";

const HOST = "http://78.46.50.53:8123";

async function main() {
  const username = process.env.CH_USERNAME;
  assert(username, "CH_USERNAME is not set");
  const password = process.env.CH_PASSWORD;
  assert(password, "CH_PASSWORD is not set");

  const s3Endpoint = process.env.S3_API_ENDPOINT;
  assert(s3Endpoint, "S3_API_ENDPOINT is not set");
  const s3AccessKey = process.env.S3_ACCESS_KEY_ID;
  assert(s3AccessKey, "S3_ACCESS_KEY_ID is not set");
  const s3SecretKey = process.env.S3_SECRET_ACCESS_KEY;
  assert(s3SecretKey, "S3_SECRET_ACCESS_KEY is not set");

  const sql = `SELECT 
    name,
    product,
    count(*) as count
FROM (
    SELECT 
        name,
        tripId,
        line.product AS product
    FROM s3(
        '${s3Endpoint}/event_date=2025-05-22/hr=*/*.json.gz',
        '${s3AccessKey}',
        '${s3SecretKey}',
        'JSONEachRow'
    )
    GROUP BY 
        name, 
        line.product, 
        tripId
)
GROUP BY 
    name, 
    product
ORDER BY name

FORMAT JSON
`;

  const res = await fetch(`${HOST}?query=${encodeURIComponent(sql)}`, {
    headers: {
      Authorization: "Basic " + btoa(`${username}:${password}`),
      accept: "application/json",
    },
  });

  console.log(await res.text());
}

main();
