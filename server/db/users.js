import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : { type: String, required: true},
    wins : { type : Number, required: true},
    games : [{ positions : [String], turn : String, me : String, opponent : String}],
    authentication : {
        password : { type : String, required : true, select : false},
        salt : { type : String, select : false},
        sessionToken : {type : String, select : false},
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();

export const deleteUserById = (id) => UserModel.findOneAndDelete({ _id: id});

export const getUserById = (id) => UserModel.findById(id);