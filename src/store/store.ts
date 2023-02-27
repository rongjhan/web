import { configureStore} from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "./endpoint"
import appReducer from "./appSlice"


export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        app:appReducer,
        [api.reducerPath]: api.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

// configure listeners using the provided defaults
setupListeners(store.dispatch)


window.store = store