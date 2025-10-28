import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000/api";
const WEATHER_API = process.env.WEATHER_API; // e.g. "https://api.openweathermap.org/data/2.5"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getenergyGenerationRecord: builder.query({
      query: ({ id, groupBy, range }) =>
        `energy-generation-records/solar-units/${id}?groupBy=${groupBy}${
          range ? `&range=${range}` : ""
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
