const express = require("express");
const router = express.Router();
const { getProduct,getProductDetails, searchProduct, favouriteProduct,getFavouriteProducts, removeFavouriteProducts } = require("../controllers/productController");

router.post("/product",getProduct);
router.post("/product-detail",getProductDetails);
router.post("/search",searchProduct);
router.post("/favouriteProduct",favouriteProduct);
router.post("/getProducts",getFavouriteProducts);
router.post("/deleteProducts",removeFavouriteProducts);

module.exports = router;