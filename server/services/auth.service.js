const { User } = require("../models/user")
const httpStatus = require("http-status")
const { ApiError } = require("../middleware/apiError")
const userService = require("./user.service")


/**
 * Creates a new user with the provided email and password.
 * 
 * This function checks if the given email is already taken by an existing user.
 * If the email is available, a new user is created and saved to the database.
 * If the email is already taken, a BadRequest error is thrown with an appropriate message.
 * 
 * @param {string} email - The email address of the new user.
 * @param {string} password - The password for the new user.
 * @returns {object} The newly created user object.
 * @throws {ApiError} If an error occurs during the process, it is re-thrown with relevant information.
 */
const createUser = async (email, password) => {
    try {
        // Check if the provided email is already taken by an existing user
        if (await User.emailTaken(email)) {
            // If email is already taken, throw a BadRequest error with a custom message
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken")
        }

        // Create a new user instance with the provided email and password
        const user = new User({
            email,
            password
        });

        // Save the newly created user to the database
        await user.save();
        return user;

    } catch (error) {
        throw error;
    }
}

// Generates an authentication token for a given user.
// This token is used for user identification and authorization.
const genAuthToken = (user) => {
    const token = user.generateAuthToken();
    return token;
}

// 
const signInWithEmailAndPassword = async (email, password) => {
    try {
        const user = await userService.findUserByEmail(email);

        // check email 
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry BAD email")
        }

        // check password
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry BAD password")
        }

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    genAuthToken,
    signInWithEmailAndPassword
}

