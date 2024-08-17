import {connect} from "mongoose";
import env from 'dotenv'
env.config()

const url = process.env.MONGO_URL;
export const connectToDb =async()=>{
  const db = await connect(url);
  console.log(db.connection.name)
} 

