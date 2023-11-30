const express = require("express");
const router = express.Router();
const { getProduct } = require("../controllers/productController");

router.post("/product",getProduct);

module.exports = router;