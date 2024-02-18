import {fastify} from "fastify"
import fastifyFormbody from "@fastify/formbody";

export const buildData = (opts = {}) => {
    const appData = fastify(opts)

    appData.register(import("./plugins/jwt.js"))
    appData.register(fastifyFormbody)
    appData.register(import("./routes/routes.js"))

    return appData
}