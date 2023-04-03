const CustomError = require("../errors");
const { isJWTvalid } = require("../utils");

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    try {
        var user = isJWTvalid({ token });

        req.user = user;

        if (!req.user.isVerified)
            throw new CustomError.UnauthenticatedError("Authentication Invalid");

        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
};

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError(
                "Unauthorized to access this route"
            );
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizePermissions,
};