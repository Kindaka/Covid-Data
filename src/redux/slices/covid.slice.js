import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createGeoJSONFromCovidCases } from "../../util";

export const covidApi = createApi({
  reducerPath: "covidApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5268/odata/" }),
  endpoints: (builder) => ({
    getCovidCases: builder.query({
      query: ({ selectedFilter, selectedDate }) => ({
        url: "CovidDailies",
        params: {
          $expand: "CountryRegion",
          $filter: `day eq ${selectedDate ? selectedDate : "2021-01-03"}`,
          $select: selectedFilter,
        },
       
      })
    }),
  }),
  keepUnusedDataFor: 3600,
});

export const { useGetCovidCasesQuery } = covidApi;
