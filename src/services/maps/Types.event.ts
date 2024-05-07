export type ReverseGeocodingResponse = {};

export type ReverseGeocodingParams = {
  lat: number;
  lng: number;
};
export type SearchGeocodingParams = {
  q: string;
};
export type SearchGeocodingResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: number[];
};
