import mongoose from 'mongoose';
import {app} from './app'

const start = async () =>{
  console.log('Starting up ............');
  try{

    await mongoose.connect("mongodb+srv://stanley:stanley@cluster0.f66t8.mongodb.net/?retryWrites=true&w=majority");
    console.log('Connected to MongoDb');
  }catch(err){
    console.error(err);
  }
  app.listen(3001,()=>{
    console.log('Listening on port 3001!!!!!!!!');
  }); 
}

start();