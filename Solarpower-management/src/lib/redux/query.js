import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { get } from "http";

const BASE_URL = "http://localhost:3000/api";
const WEATHER_API = import.meta.env.VITE_WEATHER_API; // ✅ Vite uses import.meta.env

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const clerk = window.Clerk;
      if (clerk && clerk.session && clerk.session.getToken) {
        const token = await clerk.session.getToken();
        console.log("Clerk Token:", token);
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["SolarUnit", "RegisteredUser", "User"], // for automatically refetching
  endpoints: (builder) => ({
    getEnergyGenerationRecord: builder.query({
      query: ({ id, groupBy, limit }) =>
        `energy-generation-records/solar-units/${id}?groupBy=${groupBy}${
          limit ? `&limit=${limit}` : ""
        }`,
    }),
    getSolarUnitsByClerkUserId: builder.query({
      query: () => `solar-units/user`,
      providesTags: ["SolarUnit"],
    }),
    getAllSolarUnits: builder.query({
      query: () => `solar-units`,
      providesTags: ["SolarUnit"],
    }),
    getAllUsers: builder.query({
      query: () => `users`,
      providesTags: ["User"],
    }),
    getAllNewUsers: builder.query({
      query: () => `solar-units/newusers`,
      providesTags: ["User"],
    }),
    getAllRegisteredUsers: builder.query({
      query: () => `users/registered-users`,
      providesTags: ["RegisteredUser"],
    }),
    getAllRegisteredUsersByClerkUserId: builder.query({
      query: (id) => `users/registered-users/${id}`,
      providesTags: ["RegisteredUser"],
    }),
    createSolarUnit: builder.mutation({
      query: (newUnit) => ({
        url: `solar-units`,
        method: "POST",
        body: newUnit,
      }),
      invalidatesTags: ["SolarUnit", "RegisteredUser", "User"],
    }),
    deleteSolarUnit: builder.mutation({
      query: (id) => ({
        url: `solar-units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SolarUnit"], 
    }),
    createRegisteredUser: builder.mutation({
      query: (user) => ({
        url: `users/registered-users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["SolarUnit", "RegisteredUser", "User"],
    }),
    updateRegisteredUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/registered-users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RegisteredUser", "User"],
    }),
  }),
});

// ✅ Export both hooks
export const {
  useGetEnergyGenerationRecordQuery,
  useGetSolarUnitsByClerkUserIdQuery,
  useGetAllSolarUnitsQuery,
  useGetAllUsersQuery,
  useGetAllNewUsersQuery,
  useGetAllRegisteredUsersQuery,
  useCreateSolarUnitMutation,
  useGetAllRegisteredUsersByClerkUserIdQuery,
  useCreateRegisteredUserMutation,
  useUpdateRegisteredUserMutation,
  useDeleteSolarUnitMutation,
} = api;

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
