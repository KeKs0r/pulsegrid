export type BVGRadarResponse = {
  movements: Movement[];
  realtimeDataUpdatedAt: number;
};

export type IngestedMovement = Movement & {
  realtimeDataUpdatedAt: number;
  ingestedAt: number;
};

export type Movement = {
  direction: string;
  tripId: string;
  line: Line;
  location: Location;
  nextStopovers: Stopover[];
  frames: Frame[];
  polyline: FeatureCollection;
};

export type Line = {
  type: string;
  id: string;
  fahrtNr: string | null;
  name: string;
  public: boolean;
  productName: string;
  mode: string;
  product: string;
};

export type Location = {
  type: string;
  latitude: number;
  longitude: number;
};

export type Stopover = {
  stop: Stop;
  arrival: string | null;
  plannedArrival: string | null;
  arrivalDelay: number | null;
  arrivalPlatform: string | null;
  arrivalPrognosisType: string | null;
  plannedArrivalPlatform: string | null;
  departure: string | null;
  plannedDeparture: string | null;
  departureDelay: number | null;
  departurePlatform: string | null;
  departurePrognosisType: string | null;
  plannedDeparturePlatform: string | null;
};

export type Stop = {
  type: string;
  id: string;
  name: string;
  location: Location & { id: string };
  products: Products;
};

export type Products = {
  suburban: boolean;
  subway: boolean;
  tram: boolean;
  bus: boolean;
  ferry: boolean;
  express: boolean;
  regional: boolean;
};

export type Frame = {
  origin: Stop;
  destination: Stop;
  t: number;
};

export type FeatureCollection = {
  type: "FeatureCollection";
  features: Feature[];
};

export type Feature = {
  type: "Feature";
  properties: Record<string, unknown>;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};
