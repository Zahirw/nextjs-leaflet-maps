import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { SearchGeocodingResponse, SearchGeocodingParams } from "../Types.event";

export const useGetSearchGeocodingQueryKey = "useGetSearchGeocodingQueryKey";

export function useGetSearchGeocodingQuery(
  param: SearchGeocodingParams
): QueryObserverResult<SearchGeocodingResponse[]> {
  return useQuery({
    queryKey: [useGetSearchGeocodingQueryKey, param],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_REVERSE_GEOCODING_NOMINATIM}/search?q=${param.q}&format=jsonv2`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(response.statusText);
          }
          throw new Error(response.statusText);
        }
        return response.json();
      } catch (error: unknown) {
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
