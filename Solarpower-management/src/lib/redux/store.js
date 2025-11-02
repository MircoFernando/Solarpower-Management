import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice.js";
import { api, weatherApi } from "./query.js";  // ✅ import both API slices
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // ✅ register both API reducers under their own paths
    [api.reducerPath]: api.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // ✅ add both API middlewares
      .concat(api.middleware)
      .concat(weatherApi.middleware),
});

// ✅ optional but recommended: enables refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);
