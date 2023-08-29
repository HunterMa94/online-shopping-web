const passport = require("passport");
const { ApiError } = require("./apiError");
const httpStatus = require("http-status");
const { roles } = require("../config/roles")


/**
 * Verification function used in the authentication middleware to check user authentication and permissions.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} resolve - The resolve function of the Promise.
 * @param {Function} reject - The reject function of the Promise.
 * @param {Array} rights - An array representing required permissions for the user.
 * @returns {Promise<void>} - A Promise that resolves if verification is successful, otherwise rejects with an error.
 */
const verify = (req, res, resolve, reject, rights) => async (err, user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, "Sorry, unauthorized"))
    }

    req.user = user;

    if (rights.length) {
        const action = rights[0]
        const resource = rights[1]
        const permission = roles.can(req.user.role)[action](resource);

        if (!permission.granted) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, "Sorry, you don't have enought rights"))
        }

        res.locals.permission = permission;
    }
    resolve()
}

/**
 * Authentication middleware for checking user authentication and permissions based on specified rights.
 *
 * This middleware utilizes Passport and role-based access control (RBAC) to authenticate users and
 * verify if they have the required permissions to access a specific route or resource.
 *
 * @param {...string} rights - An array of required permissions for the user.
 * @returns {Function} - An Express middleware function.
 */
const auth = (...rights) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verify(req, res, resolve, reject, rights))(req, res, next)
    })
        .then(() => next())
        .catch((err) => next(err))
}

module.exports = auth
