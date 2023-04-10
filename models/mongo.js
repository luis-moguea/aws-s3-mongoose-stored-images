const mongoose = require("mongoose")
const mongooseHidden = require("mongoose-hidden")()
const dotenv = require("dotenv")
const path = require("path")
dotenv.config({path: path.resolve(__dirname, "../.env")})

const mongoUri = `mongodb+srv://${process.env.USER}:${process.env.PW}@cluster0.n9lxkrd.mongodb.net/mongo-images?retryWrites=true&w=majority`

mongoose.connect(mongoUri).then(()=>{
    console.log("Database connected")
}).catch((err)=>{
    console.log(`Error: ${err}`)
})

const imageSchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

imageSchema.plugin(mongooseHidden)

const Image = mongoose.model("Images", imageSchema)

module.exports = Image