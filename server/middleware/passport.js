const { User } = require("../models/user")
require("dotenv").config();

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

}

/**
 * JWT verification function used in the JWT authentication strategy.
 *
 * @param {Object} payload - The decoded payload from the JWT token.
 * @param {Function} done - The callback function to signal the completion of verification.
 * @returns {void}
 */
const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        // If user is not found, signal authentication failure.
        if (!user) {
            return done(null, false)
        }
        // If user is found, signal successful authentication with the user data.
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}

// Create a new instance of JWT authentication strategy.
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
    jwtStrategy
}