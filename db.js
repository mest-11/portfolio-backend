import mongoose from "mongoose";
import 'dotenv/config';


const mongoUri = process.env.Mongo_url



 export const dbConnection = () => {

    mongoose.connect(mongoUri).then(() => {
        console.log('Database is connected')
    })

}