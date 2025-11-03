import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const BASE_URL = "http://localhost:3000/api";
const WEATHER_API = import.meta.env.VITE_WEATHER_API; // ✅ Vite uses import.meta.env


export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getenergyGenerationRecord: builder.query({
      query: ({ id, groupBy, limit }) =>
        `energy-generation-records/solar-units/${id}?groupBy=${groupBy}${
          limit ? `&limit=${limit}` : ""
        }`,
    }),
  }),
});

export const { useGetenergyGenerationRecordQuery } = api;

// TODO : Continue the rest of the implementation

// Weather API client
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: WEATHER_API }),
  endpoints: (builder) => ({
    // Only current weather
    getWeather: builder.query({
      query: ({ lat, lon, appid }) =>
        `weather?lat=${lat}&lon=${lon}&appid=${appid}`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
