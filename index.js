const express = require("express")
const router = require("./routes/appRouter")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", router)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})