import {createEnv} from "@t3-oss/env-nextjs"

import * as z from "zod"

export const env =createEnv({
    server:{
        BACKEND_URL: z.url(),
        FRONTEND_URL:z.url(),

        API_URL:z.url(),
        AUTH_URL:z.url()
    },

    // client:{}
    runtimeEnv:{}
})