import { fetchRadar, type Box, type RadarResult, type Spot } from "./bvg";
import type { BVGRadarResponse, IngestedMovement } from "./bvg.types";

const boxes: Spot[] = [
  {
    name: "Gardens of the World",
    north: 52.539327,
    west: 13.556528,
    south: 52.531731,
    east: 13.578587,
  },
  {
    name: "Sanimedius pharmacy Rosenthaler Platz",
    north: 52.531598,
    west: 13.396335,
    south: 52.527799,
    east: 13.407364,
  },
  {
    name: "Zenner Biergarten und Weingarten",
    north: 52.489078,
    west: 13.471888,
    south: 52.485276,
    east: 13.482918,
  },
  {
    name: "Tempelhofer Feld, Southwest entrance",
    north: 52.473396,
    west: 13.381952,
    south: 52.468194,
    east: 13.391222,
  },
  {
    name: "ibis Berlin Messe",
    north: 52.508671,
    west: 13.278603,
    south: 52.505921,
    east: 13.284032,
  },
  {
    name: "S-Bahn Wannsee",
    north: 52.422846,
    west: 13.174645,
    south: 52.420742,
    east: 13.181141,
  },
  {
    name: "Ev. Kirchengemeinde Martin-Luther-Genezareth",
    north: 52.47799,
    west: 13.420413,
    south: 52.476336,
    east: 13.423557,
  },
  {
    name: "LSD Erotikmarkt Kurfürstenstr.",
    north: 52.500544,
    west: 13.361331,
    south: 52.499215,
    east: 13.363542,
  },
  {
    name: "Siegessäule",
    north: 52.515928,
    west: 13.347428,
    south: 52.513156,
    east: 13.352433,
  },
  {
    name: "Wilhelmstrand",
    north: 52.474569,
    west: 13.496036,
    south: 52.473421,
    east: 13.498397,
  },
  {
    name: "Neue Kirche - Gendarmenmarkt",
    north: 52.515277,
    west: 13.390602,
    south: 52.512022,
    east: 13.394202,
  },
  {
    name: "Krokuswiese im Volkspark Humboldthain",
    north: 52.545675,
    west: 13.375527,
    south: 52.541877,
    east: 13.386514,
  },
  {
    name: "Spreebrücke Bahnhof Friedrichstraße",
    north: 52.52105,
    west: 13.384638,
    south: 52.519506,
    east: 13.388913,
  },
];

let counter = 0;
main();
async function main() {
  async function run() {
    counter++;
    console.log("Running", counter);
    const batch = await fetchBatch();
    await processBatch(batch);
    setTimeout(run, 1000 * 15);
  }
  run();
}

async function processBatch(batch: RadarResult[]) {
  const rows = batch.flatMap((b) => {
    if (!b.radar) {
      return [];
    }
    if (!b.radar.movements) {
      console.log(b.radar);
      throw new Error("stop");
    }
    return b.radar.movements.map((move) => ({
      ...b.spot,
      ...move,
      realtimeDataUpdatedAt: b.radar!.realtimeDataUpdatedAt,
      ingestedAt: Date.now(),
    }));
  });
  await ingestMovements(rows);
}

async function ingestMovements(movements: IngestedMovement[]) {
  const res = await fetch(
    "https://790db068c77946f8a68ed3357c4b5b1c.pipelines.cloudflare.com",
    {
      method: "POST",
      body: JSON.stringify(movements),
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  console.log(await res.json());
}

async function fetchBatch(): Promise<RadarResult[]> {
  return await Promise.all(
    boxes.map(async (spot) => {
      const data = await fetchRadar(spot, 1000);

      return {
        spot,
        radar: data,
      };
    })
  );
}
