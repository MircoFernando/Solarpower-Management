import { configureStore} from "@reduxjs/toolkit"
import uiReducer from "./features/uiSlice.js"   
import { api } from "./query.js";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

