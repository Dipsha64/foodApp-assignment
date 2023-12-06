const productModel = require("../model/productModel");

const getProduct = async(req,res) =>{
    try{
        const query = req.body.title;
        const page = req.body.page;
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=e11f632137ff4df59a0431ed79215828&query=${query}&number=${page}`);
        const data = await response.json();
        res.json({message : "get data successfully",status : true,data : data}); 
    }
    catch(error){
        console.log(error);
    }
}

const getProductDetails = async (req,res) =>{
    try{
        console.log("RE",req.body);
        const query = req.body.id;
        const response = await fetch(`https://api.spoonacular.com/recipes/${query}/information?apiKey=e11f632137ff4df59a0431ed79215828`)
        const data = await response.json();
        res.json({message : "get data successfully",status : true,data : data});
    }
    catch(error){
        console.log(error);
    }
}

const searchProduct = async (req,res) =>{
    try{
        const query = req.body.value;
        const page = req.body.page;
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=e11f632137ff4df59a0431ed79215828&query=${query}&page=${page}`);
        const data = await response.json();
        res.json({message : "get data successfully",status : true,data : data});
    }
    catch(error){
        console.log(error);
    }
}

const favouriteProduct = async (req,res) =>{
    try{
        const value = req.body;
        console.log("value..",value);
        if(value){
            const favObj = {productId : req.body.proData.id,userId:req.body.userData._id, productDetail: req.body.proData};
            console.log("favObj,,,,",favObj);
            const addProduct = await productModel.create(
                favObj);
            if(addProduct){
                console.log("addProduct,,,",addProduct);
                res.json({message : "Product Added to wishlist successfully",status : true,data : addProduct});
            }
            else{
                res.json({message : "Requested data is not valid, Please try it again",status : false});
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

const getFavouriteProducts = async (req,res) =>{
    try{
        const savedProducts = await productModel.find({userId:req.body.userDetail._id});
        res.json({message : "Product fetch successfully",status : true,data : savedProducts});
    }
    catch(error){
        console.log(error);
    }
}

const removeFavouriteProducts = async (req,res) =>{
    try{
        const objData = req.body.productData;
        const obj = await productModel.find({"productId":req.body.productData.productId,"userId":req.body.productData.userId});
        if(!obj){
            res.json({"message" : "Contact not found"});
        }
        else{
            const result = await productModel.deleteOne({"productId":req.body.productData.productId,"userId":req.body.productData.userId});
            if (result.deletedCount === 1) {
                res.json({"message":"Product remove from wishlist.",status : true, data : {objData}});
            } else {
            res.json({"message":"No documents matched the query. Deleted 0 documents.",status : false});
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { getProduct , getProductDetails, searchProduct, favouriteProduct, getFavouriteProducts, removeFavouriteProducts };