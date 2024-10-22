const express = require("express");
const app = express();
app.use(express.json());
const connectDb = require("./config/dbConnection.js");
const dotenv = require("dotenv").config();
const cors = require("cors");
connectDb();
app.use(cors())

app.use("/api",require("./routes/userRoutes.js"));
app.use("/app",require("./routes/productRoutes.js"));

const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Running in ",port);
})