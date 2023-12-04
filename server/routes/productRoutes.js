const express = require("express");
const router = express.Router();
const { getProduct,getProductDetails, searchProduct } = require("../controllers/productController");

router.post("/product",getProduct);
router.post("/product-detail",getProductDetails);
router.post("/search",searchProduct);

module.exports = router;