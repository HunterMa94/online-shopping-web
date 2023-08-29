const { User } = require("../models/user");
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateToken = async (token) => {
    return jwt.verify(token, process.env.DB_SECRET);
}

const findUserByEmail = async (email) => {
    return await User.findOne({ email: email })
}

const findUserById = async (_id) => {
    return await User.findById(_id);
}

/**
 * Update user profile based on request data.
 *
 * @param {Object} req - The Express request object containing user information.
 * @returns {Promise<Object>} - A Promise that resolves to the updated user profile, or rejects with an error.
 * @throws {ApiError} - If the user is not found or an error occurs during the update process.
 */
const updateUserProfile = async (req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set": {
                    ...req.body.data
                }
            },
            { new: true } //return the new one
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "user not found")
        }
        return user;
    } catch (error) {
        throw error;
    }
}


/**
 * Update user email address and mark it as unverified.
 *
 * @param {Object} req - The Express request object containing user information and new email.
 * @returns {Promise<Object>} - A Promise that resolves to the updated user profile, or rejects with an error.
 * @throws {ApiError} - If the new email is already taken, the user is not found, or an error occurs during the update process.
 */
const updateUserEmail = async (req) => {
    try {
        // Check if the new email is already taken by another user.
        if (await User.emailTaken(req.body.newEmail)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Sorry email taken");
        }

        // Find the user by their unique identifier (_id) and current email, then update the email and mark it as unverified
        const user = await User.findOneAndUpdate(
            { _id: req.user._id, email: req.user.email },
            {
                "$set": {
                    email: req.body.newemail,
                    verified: false
                }
            },
            { new: true } //return the new one
        )

        // If user is not found, throw an ApiError indicating "user not found".
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "user not found")
        }

        return user;
    } catch (error) {

    }
}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken
}