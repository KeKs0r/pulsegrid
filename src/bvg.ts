import { promises as fs } from "fs";
import type { BVGRadarResponse } from "./bvg.types";
import { mapValues } from "es-toolkit";

const bbox = "north=52.52411&west=13.41002&south=52.51942&east=13.41709";
const results = 10;

async function main() {
  const box = {
    north: 52.52411,
    west: 13.41002,
    south: 52.51942,
    east: 13.41709,
  };

  const data = await fetchRadar(box, results);
  console.log(data);
}

export type Box = {
  north: number;
  west: number;
  south: number;
  east: number;
};

export type Spot = Box & {
  name: string;
};

export type RadarResult = {
  spot: Spot;
  radar: BVGRadarResponse | null;
};

export async function fetchRadar(box: Spot, limit: number) {
  const search = new URLSearchParams({
    ...mapValues(box, (v) => v.toString()),
    results: limit.toString(),
  });
  const url = `https://v6.bvg.transport.rest/radar?${search.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = (await res.json()) as BVGRadarResponse;
  if (Array.isArray(data)) {
    console.log("Empty", box.name);
    return null;
  }

  console.log(
    "Delay",
    box.name,
    Date.now() / 1000 - data.realtimeDataUpdatedAt
  );

  return data;
}
