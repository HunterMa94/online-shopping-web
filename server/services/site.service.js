const { Site } = require("../models/site");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");

const postSiteArgs = async (req) => {

    try {
        const site = new Site({
            ...req.body
        });
        await site.save();
        return site;
    } catch (error) {
        throw error
    }
}


const getSiteArgs = async () => {

    try {
        const site = Site.find({})
            .limit(1)
        if (!site) throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
        return site;
    } catch (error) {
        throw error
    }
}

const updateSiteArgs = async (req) => {

    try {
        const site = Site.findByIdAndUpdate(
            { _id: req.body._id },
            { "$set": req.body },
            { new: true }
        );
        if (!site) throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
        return site;
    } catch (error) {
        throw error
    }
}



module.exports = {
    postSiteArgs,
    getSiteArgs,
    updateSiteArgs
}

