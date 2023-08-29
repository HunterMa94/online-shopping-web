const { userService, authService, emailService } = require("../services");
const httpStatus = require('http-status');
const { ApiError } = require("../middleware/apiError")

const usersController = {
    async profile(req, res, next) {
        try {
            const user = await userService.findUserById(req.user._id);
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, "User not found")
            }
            // res.json(user)
            res.json(res.locals.permission.filter(user._doc)) //filter the info give to user

        } catch (error) {
            next(error);
        }
    },

    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req);
            // res.json(user);
            res.json(res.locals.permission.filter(user._doc)) //filter the info give to user
        } catch {
            next(error)
        }
    },

    async updateEmail(req, res, next) {
        try {
            const user = await userService.updateUserEmail(req);
            const token = await authService.genAuthToken(user);

            // send email to verify account
            await emailService.registerEmail(user.email, user);

            // send email to verify account
            res.cookie("x-access-token", token).send(
                { user, token }
            )
            // res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },

    /**
     * Verify a user's account based on the provided validation token.
     *
     * @param {Object} req - The Express request object containing query parameters.
     * @param {Object} res - The Express response object for sending responses.
     * @param {Function} next - The next middleware function to pass control to.
     * @returns {Promise<void>} - A Promise that resolves when the verification process is completed.
     * @throws {ApiError} - If the token is invalid, the user is not found, or the user is already verified.
     */
    async verifyAccount(req, res, next) {
        try {
            // Validate the token and find the user by ID from the token
            const token = await userService.validateToken(req.query.validation);
            // console.log(token);
            const user = await userService.findUserById(token.sub);  //token.sub is the id of user

            // user not found
            if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

            // user already verified
            if (user.verified) throw new ApiError(httpStatus.BAD_REQUEST, "User already verified");

            // set verified
            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({
                user
            })

        } catch (error) {
            next(error)
        }
    }

};

module.exports = usersController;