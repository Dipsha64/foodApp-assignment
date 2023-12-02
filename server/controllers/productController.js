const getProduct = async(req,res) =>{
    try{
        console.log("FORRR",req.body.title,req.body.page);
        const query = req.body.title;
        const page = req.body.page;
        const response = await fetch(`https://api.spoonacular.com/food/products/search?apiKey=18db11ed472b422f8952f535173c6521&query=${query}&number=${page}`);
        const data = await response.json();
        res.json({message : "get data successfully",status : true,data : data});
        
    }
    catch(error){
        console.log(error);
    }
}

const getProductDetails = async (req,res) =>{
    try{

    }
    catch(error){
        console.log(error);
    }
    // https://api.spoonacular.com/recipes/716429/information?apiKey=18db11ed472b422f8952f535173c6521
}
module.exports = { getProduct , getProductDetails };