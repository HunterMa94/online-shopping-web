const express = require("express");
const brandControllers = require("../controllers/brand.controller")
const router = express.Router();
const auth = require("../middleware/auth");


router.route("/brand/:id")
    .get(brandControllers.getBrand)
    .delete(auth("deleteAny", "brand"), brandControllers.deleteBrandById)


router.post("/brand", auth("createAny", "brand"), brandControllers.addBrand)

router.get("/all", brandControllers.getBrands)

module.exports = router