// This file is used for manage API router for server connection;
const host = "http://localhost:3008";

export const registerRoute = `${host}/api/register`;
export const loginRoute = `${host}/api/login`;
export const selectedProducts = `${host}/app/product`;
export const searchProduct = `${host}/app/search`;
export const productDetailRoute = `${host}/app/product-detail`
export const favouriteProductRoute = `${host}/app/favouriteProduct`;
export const getProductsRouter = `${host}/app/getProducts`;
export const removeItemRouter = `${host}/app/deleteProducts`;