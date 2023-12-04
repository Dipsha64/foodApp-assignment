const getProduct = async(req,res) =>{
    try{
        const query = req.body.title;
        const page = req.body.page;
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.APIKEY}&query=${query}&number=${page}`);
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
        const response = await fetch(`https://api.spoonacular.com/recipes/${query}/information?apiKey=${process.env.APIKEY}`)
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
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${process.env.APIKEY}&query=${query}&page=${page}`);
        const data = await response.json();
        res.json({message : "get data successfully",status : true,data : data});
    }
    catch(error){
        console.log(error);
    }
}
module.exports = { getProduct , getProductDetails, searchProduct };