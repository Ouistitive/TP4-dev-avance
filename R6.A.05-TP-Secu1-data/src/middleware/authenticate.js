

export function parseJwt (token) {
    token = token.split(" ")[1];
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}