import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import * as fs from 'node:fs';
import * as path from "path"

export const privateKeyPath = path.join("", '..', './R6.A.05-TP-Secu1-auth', '.ssl', 'ecdsa.pri');
export const publicKeyPath = path.join("", '..', './R6.A.05-TP-Secu1-auth', '.ssl', 'ecdsa.pub');

export default fp(async function (app, opts) {

    app.register(fastifyJwt, {
        secret: {
            private: fs.readFileSync(privateKeyPath),
            public: fs.readFileSync(publicKeyPath)
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        }
    });

})