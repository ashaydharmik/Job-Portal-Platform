const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const bodyParser = require("body-parser")
const cors = require("cors")
const serverHealth = require("./routes/healthRoute")

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

//server health API
app.get("/health", serverHealth)



//mongodb connection
app.listen(process.env.PORT, ()=>{
    mongoose.connect(process.env.MONGODB_CONNECT)
    .then(()=> console.log(`mongodb connected and server is running at port ${process.env.PORT}`))
    .catch((error)=> console.log(error))
})