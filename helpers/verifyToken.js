const jwt = require('jsonwebtoken');
const getToken = require('./getToken');

const verifyToken = (req, res, next) => {

    console.log(req.headers);

    if(!req.headers.authorization) {
        res.status(401).json({ message: "Você não tem autorização!"});
        return;
    }

    const token = getToken(req);
    if(!token) {
        res.status(401).json({ message: "Acesso negato!"});
        return;
    }

    try {
        const verified = jwt.verify(token, 'mysecret');
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido!"});
        return;
    }
}

module.exports = verifyToken;