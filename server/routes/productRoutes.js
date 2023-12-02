const express = require("express");
const router = express.Router();
const { getProduct,getProductDetails } = require("../controllers/productController");

router.post("/product",getProduct);
router.get("/product-detail",getProductDetails);

module.exports = router;