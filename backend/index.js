const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require("body-parser")
const cors = require("cors")
const errorHandler = require("./Middleware/errorHandler")


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.use("/", errorHandler,require("./routes/userRoute"))

//Error handler middleware 
app.use(errorHandler)


//mongodb connection
app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log(`mongodb connected and server is running at port ${process.env.PORT}`))
    .catch((error)=> console.log(error))
})