import mongoose, { mongo } from "mongoose";

async function connectaDataBase(){
    mongoose.connect(
        "mongodb+srv://admin:admin123@cluster0.cfcbzfp.mongodb.net/livraria?retryWrites=true&w=majority"
      );
      return mongoose.connection
}

export default connectaDataBase

