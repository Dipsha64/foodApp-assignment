const getProduct = async(req,res) =>{
    try{
        console.log("FORRR",req.body.title);
        const query = req.body.title;
        const data = await fetch("https://api.spoonacular.com/food/products/search?apiKey=18db11ed472b422f8952f535173c6521&query=shakes&number=10");

        res.json({message : "Done successfully",status : true,data : data});
        // fetch("https://api.spoonacular.com/food/products/search?apiKey=18db11ed472b422f8952f535173c6521&query=shakes&number=100").then((data)=>{
        //     console.log("data...",data);
            
        // })
        
    }
    catch(error){
        console.log(error);
    }
}

module.exports = { getProduct };