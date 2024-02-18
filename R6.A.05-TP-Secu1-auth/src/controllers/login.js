import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export const addUser = async (req, res) => {
    if (req.body == null) {
        res.status(400).send({
            message: "Veuillez renseigner tous les champs"
        })
    }

    const {email, password} = req.body
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    user = {
        email,
        password: hashedPassword,
        role: role[getRandomInt(2)]
    }

    users.push(user)

    res.status(201).send({
        "message": "Utilisateur enregistré avec succès"
    });
}

export const loginUser = async function (req, res) {
    const { email, password } = req.body;
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex");

    const user = users.find((u) => u.email === email && u.password === hashedPassword);

    if (!user) {
        return res.status(401).send({
            message: "Utilisateur non-identifié"
        });
    }

    const userWithoutPassword = {
        email: user.email,
        role: user.role
    }
    const token = await res.jwtSign(userWithoutPassword);

    res.status(200).send({ token });
};