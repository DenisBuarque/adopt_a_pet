const jwt = require('jsonwebtoken');

const createUserToken = async (req, res, user) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'mysecret');

    console.log(req)

    res.status(200).json({ 
        message: 'Você está autenticado!', 
        token: token,
        userId: user._id
    });
}

module.exports = createUserToken;