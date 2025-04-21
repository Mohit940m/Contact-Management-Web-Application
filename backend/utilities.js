const jwt = require("jsonwebtoken");

function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user; // Attach the user object to the request
        next();
    });
}

module.exports = { autenticateToken };
