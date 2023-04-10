const mongoose = require("mongoose")
const Image = require("../models/mongo")
Image()
const path = require("path")
const dotenv = require("dotenv")
dotenv.config({path: path.resolve(__dirname, "../.env")})
const { S3Client, AbortMultipartUploadCommand, PutObjectCommand } = require("@aws-sdk/client-s3")


const bucketName = process.env.BUCKET_NAME
const regionName = process.env.BUCKET_REGION
const awsKey = process.env.AWS_KEY
const secretKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: awsKey,
        secretAccessKey: secretKey
    },
    region: regionName
})

const controller = {

    getImages: (req,res)=> {
        Image.find({}).then((images)=>{
            res.send(images)
        })

        mongoose.connection.close
    },


    postImage: (req,res)=> {
        console.log(req.body)
        console.log(req.file)
        req.file.buffer


        const params = {
            Bucket: bucketName,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const command = new PutObjectCommand(params)

        s3.send(command, (err, data) =>{
            if(err){
                console.log(err)
            } else {
                console.log(data)
            }

            const newImage = new Image({
                name: req.body.name,
                image: data.Location
            })
    
            newImage.save().then(()=>{
                res.send({image: data.Location})
                }).catch((err)=>{
                    console.log(err)
            })
        })

        Image.create()
    }
}

module.exports = controller