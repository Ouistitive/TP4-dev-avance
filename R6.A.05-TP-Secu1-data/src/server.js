import process from "process";
import * as fs from 'node:fs';
import * as path from "path"

const {buildData} = await import ("./app.js")

const serverKeyPath = path.join("", '..', './R6.A.05-TP-Secu1-auth', '.ssl', 'server.key');
const serverCrtPath = path.join("", '..', './R6.A.05-TP-Secu1-auth', '.ssl', 'server.crt');

const opts = {
    logger: true,
    https: {
        key: fs.readFileSync(serverKeyPath),
        cert: fs.readFileSync(serverCrtPath)
    }
}

const app = buildData(opts)

const start = async () => {
    try {
        await app.listen({port: 4000})
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}
start()