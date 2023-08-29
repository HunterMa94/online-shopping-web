const { Product } = require("../models/product")
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const mongoose = require('mongoose');
require("dotenv").config();


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'de7jjemxo',
    api_key: "186459194981879",
    api_secret: `${process.env.CN_API_SECRET}`
});

/**
 * Add a new product.
 * @param {Object} body - The product details to be added.
 * @returns {Promise} Resolves with the added product.
 * @throws {ApiError} If an error occurs while adding the product.
 */
const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body
        });
        await product.save();
        return product;
    } catch (error) {
        throw error
    }
}

/**
 * Get a product by its ID.
 * @param {string} _id - The ID of the product to retrieve.
 * @returns {Promise} Resolves with the retrieved product.
 * @throws {ApiError} If the product is not found.
 */
const getProductById = async (_id) => {
    try {
        const product = await Product.findById(_id).populate('brand').populate("brand");
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error
    }
}

/**
 * Update a product by its ID.
 * @param {string} _id - The ID of the product to update.
 * @param {Object} body - The updated product details.
 * @returns {Promise} Resolves with the updated product.
 * @throws {ApiError} If the product is not found.
 */
const updateProductById = async (_id, body) => {
    try {
        const product = await Product.findByIdAndUpdate(
            { _id },
            { "$set": body },
            { new: true }
        );
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error
    }
}

/**
 * Delete a product by its ID.
 * @param {string} _id - The ID of the product to delete.
 * @returns {Promise} Resolves with the deleted product.
 * @throws {ApiError} If the product is not found.
 */
const deleteProductById = async (_id) => {
    try {
        const product = await Product.findByIdAndRemove(_id)
        if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;
    } catch (error) {
        throw error
    }
}

/**
 * Retrieve all products.
 * @param {Object} req - The request object containing query parameters.
 * @returns {Promise} Resolves with an array of products.
 * @throws {ApiError} If an error occurs while retrieving products.
 */
const allProducts = async (req) => {
    try {

        const products = await Product
            .find({})
            .populate("brand")
            .sort([
                [req.query.sortBy, req.query.order]
            ])
            .limit(parseInt(req.query.limit));

        if (!products) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return products;
    } catch (error) {
        throw error
    }
}

/**
 * Paginate and filter products based on given search criteria.
 * @param {Object} req - The HTTP request object.
 * @returns {Promise} Resolves to the paginated list of filtered products.
 * @throws {Error} If an error occurs while querying the database.
 */
const paginateProducts = async (req) => {
    try {

        // const example = {
        //     "keywords": "elite",
        //     "brand": ["64dc8fe2f0415d32e50a74ed", "64dc8fe2f0415d32e50a74ed"],
        //     "min": 200,
        //     'max': 500,
        //     "frets": 24
        // }

        let aggQueryArray = [];

        // Apply keyword search if provided
        if (req.body.keywords && req.body.keywords != "") {
            const re = new RegExp(`${req.body.keywords}`, "gi");
            aggQueryArray.push({
                $match: { model: { $regex: re } }
            })
            // console.log(aggQueryArray);
        }

        // Apply brand filter if provided
        if (req.body.brand && req.body.brand.length > 0) {
            // console.log(req.body.brand);
            let newBrandsArray = req.body.brand.map(item => {
                return mongoose.Types.ObjectId(item)
            });
            aggQueryArray.push({
                $match: { brand: { $in: newBrandsArray } }
            })
            // console.log(aggQueryArray);
        }

        // Apply frets filter if provided
        if (req.body.frets && req.body.frets > 0) {
            aggQueryArray.push({
                $match: { frets: { $in: req.body.frets } }
            })
        }

        // Apply price range filter if provided
        if (req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000) {
            if (req.body.min) {
                aggQueryArray.push({ $match: { price: { $gt: req.body.min } } });  //minimum price
            }
            if (req.body.max) {
                aggQueryArray.push({ $match: { price: { $lt: req.body.max } } });  //minimum price
            }
        }

        // Add populate to get brand details
        aggQueryArray.push(
            {
                $lookup:
                {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            { $unwind: "$brand" }
        )

        // console.log(aggQueryArray);

        // Create the aggregation pipeline
        let aggQuery = Product.aggregate(aggQueryArray);

        const options = {
            page: req.body.page,
            limit: 8,
            sort: { date: "desc" }
        }

        // Paginate and return filtered products
        const products = await Product.aggregatePaginate(aggQuery, options);
        return products;
    } catch (error) {
        throw error
    }
}

/**
 * Uploads an image to Cloudinary.
 * 
 * @param {Object} req - The request object containing the uploaded file.
 * @returns {Object} An object containing the public ID and URL of the uploaded image.
 * @throws {Error} If an error occurs during the upload process.
 */
const picUpload = async (req) => {
    try {
        const upload = await cloudinary.uploader.upload(req.files.file.path, {
            public_id: `${Date.now()}`,
            folder: 'waves_uploads'
        });

        // console.log(upload);

        return {
            public_id: upload.public_id,
            url: upload.url
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    picUpload
}