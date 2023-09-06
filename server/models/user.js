const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("bcrypt/promises");
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {    //check the formate of the email
            if (!validator.isEmail(value)) {
                throw new Error("Invaild email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],  //allow only user or admin
        default: "user"
    },
    firstname: {
        type: String,
        maxLength: 100,
        trim: true,
        default: ""
    },
    lastname: {
        type: String,
        maxLength: 100,
        trim: true,
        default: ""
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    }
});

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
    let user = this;

    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next();
});

userSchema.methods.generateAuthToken = function () {
    let user = this;
    // Create a user object for the JWT payload
    const userObj = { sub: user._id.toHexString(), email: user.email };
    // Generate a JWT using user object and secret key
    // Set the expiration time to 1 day (1d)
    const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: '1d' });
    return token;
}

userSchema.methods.generateRegisterToken = function () {
    let user = this;
    const userObj = { sub: user._id.toHexString() };
    const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: '10h' });
    return token;
}

// Define a static method on the userSchema to check if an email is already taken
userSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({ email });
    // Convert the user object into a boolean value
    return !!user;
}

userSchema.methods.comparePassword = async function (candidatePassword) {
    //candidate password = unhashed password
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    // if match password is correct
    return match;
}

const User = mongoose.model("User", userSchema);
module.exports = { User };


