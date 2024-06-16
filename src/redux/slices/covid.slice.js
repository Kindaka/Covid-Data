import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createGeoJSONFromCovidCases } from "./utils";

export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5268/odata/" }),
  endpoints: (builder) => ({
    getCovidCases: builder.query({
      query: ({ selectedFilter, selectedDate }) => ({
        url: "CovidDailies",
        params: {
          $expand: "CountryRegion",
          $filter: `day eq ${selectedDate}`,
          $select: selectedFilter,
        },
        transformResponse: (response) =>
          createGeoJSONFromCovidCases(response.value),
      }),
    }),
  }),
  keepUnusedDataFor: 3600,
});

export const { useGetCovidCasesQuery } = covidApi;
