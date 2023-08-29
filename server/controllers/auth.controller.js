const { authService, emailService } = require("../services")
const httpStatus = require('http-status')

// Define an authController object to handle authentication-related operations.
const authColtroller = {
    // Handler for user registration.
    async register(req, res, next) {
        try {
            const { email, password } = req.body;

            // Create a new user using the authService and generate an authentication token.
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);

            // send register email & verify
            await emailService.registerEmail(email, user);

            // Set a cookie with the authentication token and send a response with user data and token.
            res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
                user,
                token
            })
        } catch (error) {
            // console.log(error);
            next(error);
        }
    },
    // Handler for user sign-in.
    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signInWithEmailAndPassword(email, password);
            const token = await authService.genAuthToken(user);

            res.cookie("x-access-token", token).send({
                user,
                token
            })
        } catch (error) {
            next(error)
        }
    },

    // Handler to check if a user is authenticated.
    async isauth(req, res, next) {
        res.json(req.user)
    }
}

module.exports = authColtroller;