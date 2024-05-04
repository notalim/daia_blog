import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        // console.log(bearerToken);
        jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(403).json({ error: "Token is invalid" });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(403).json({ error: "No token provided" });
    }
};

export default verifyToken;