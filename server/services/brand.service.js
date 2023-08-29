const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const { Brand } = require("../models/brand")

/**
 * Add a new brand with the given brand name.
 *
 * @param {string} brandname - The name of the brand to be added.
 * @returns {Promise} - A Promise that resolves with the newly added brand.
 * @throws {Error} - If an error occurs while adding the brand.
 */
const addBrand = async (brandname) => {
    try {
        const brand = new Brand({
            name: brandname
        })
        await brand.save();
        return brand;
    } catch (error) {
        throw error;
    };
}

/**
 * Get a brand by its unique ID.
 *
 * @param {string} id - The ID of the brand to retrieve.
 * @returns {Promise} - A Promise that resolves with the retrieved brand.
 * @throws {ApiError} - If the brand is not found or an error occurs.
 */
const getBrandById = async (id) => {
    try {
        const brand = await Brand.findById(id);
        if (!brand) throw new ApiError(httpStatus.NOT_FOUND, 'Brand not found')
        return brand;
    } catch (error) {
        throw error;
    }
}

/**
 * Delete a brand by its unique ID.
 *
 * @param {string} id - The ID of the brand to delete.
 * @returns {Promise} - A Promise that resolves with the deleted brand.
 * @throws {Error} - If an error occurs while deleting the brand.
 */
const deleteBrandById = async (id) => {
    try {
        const brand = await Brand.findByIdAndRemove(id);
        return brand;
    } catch (error) {
        throw error;
    }
}

/**
 * Get a list of brands with optional sorting and limiting.
 *
 * @param {Object} args - Arguments for sorting and limiting the results.
 * @param {string} args.order - The sorting order ("asc" or "desc").
 * @param {number} args.limit - The maximum number of brands to retrieve.
 * @returns {Promise} - A Promise that resolves with the retrieved brands.
 * @throws {ApiError} - If the brands are not found or an error occurs.
 */
const getBrands = async (args) => {
    try {
        let order = args.order ? args.order : "desc";
        let limit = args.limit ? args.limit : 100;
        const brands = await Brand
            .find({})
            .sort([
                ["_id", order]
            ])
            .limit(limit);
        if (!brands) throw new ApiError(httpStatus.NOT_FOUND, "Brands not found");
        return brands;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getBrands
}