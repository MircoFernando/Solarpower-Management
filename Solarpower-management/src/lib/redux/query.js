import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "http://localhost:3000/api";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getenergyGenerationRecord: builder.query({
        query: (id) => `energy-generation-records/solar-units/${id}`,
    }),
    }),
});

export const { useGetenergyGenerationRecordQuery } = api;