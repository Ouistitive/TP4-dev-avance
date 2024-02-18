import {parseJwt} from "../middleware/authenticate.js";
export const sendHello = async (req, res) => {
    return res.status(200).send({
        "hello": "world"
    });
}

export const getAuthHandler = async function (req, res) {
    if(req.headers.authorization == null) {
        res.status(401).send({
            message: "Utilisateur non-identifié"
        });
    }

    const userInfo = parseJwt(req.headers.authorization);

    let message = "";
    if(userInfo.role === "admin") {
        message = "Full access";
    } else {
        message = "Accès limité";
    }

    res.status(200).send({
        message
    });
}

