import { fetchRadar } from "./bvg";

const res = await fetchRadar(
  {
    name: "Wilhelmstrand",
    north: 52.474569,
    west: 13.496036,
    south: 52.473421,
    east: 13.498397,
  },
  1000
);

console.log(res);
