import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
    }),
    tagTypes: ['Source','Transform',"Visualize"],
    endpoints: (build) => ({
        getConfigs: build.query({
            query: (arg) => `/configs?configType=${arg.configType}`,
            providesTags:(result, error, arg) => [{ type: arg.configType, id: "List" }]
        }),
        getConfig: build.query({
            query: (arg) => `/config?configType=${arg.configType}&configName=${arg.configName}`,
            providesTags:(result, error, arg) => [{ type: arg.configType, id: arg.configName }]
        }),
        addConfig:build.mutation({
            query: (arg) => ({
                url: `/addConfig?configType=${arg.configType}`,
            }),
            invalidatesTags:(result, error, arg) => [{ type: arg.configType, id: "List" }]
        }),
        delConfig:build.mutation({
            query: (arg) => ({
                url: `/delConfig?configType=${arg.configType}&configName=${arg.configName}`,
            }),
            invalidatesTags:(result, error, arg) => [{ type: arg.configType, id: "List" }]
        }),
        // newConfig:
    })
})

window.api = api