import {sendHello, getAuthHandler} from "../controllers/home.js";

export default async (app, opts) => {
    app.get('/home', {}, sendHello)
    app.get('/auth', {}, getAuthHandler)
}

