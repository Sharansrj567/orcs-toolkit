import jwt from "jsonwebtoken";

export const requestLogin = (req, res, next) => {
    var header = req.headers.authorization || "";
    var token = header.split(/\s+/).pop() || "";

    // console.log(`Token: ${token}`);

    if (!header && !token) {
        return res.status(401).send({
            success: false,
            message: "Please login to access this info.",
        });
    }

    const payload = jwt.verify(token, String(process.env.SECRET_KEY));
    if (!payload.role === "admin") {
        return res.status(401).send({
            success: false,
            message: "You do not have permission to perform this action",
        });
    }

    next();
};