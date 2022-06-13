import mongoose from "mongoose";

//Describe the properties that required to create a new user
//input
interface UserAttrs{
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

//functions
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc;
}

//single documents//output
interface UserDoc extends mongoose.Document{
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

  
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
},
{
    toJSON: {
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}

);


userSchema.statics.build = (attrs: UserAttrs) =>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc,UserModel>('User',userSchema);


export {User}