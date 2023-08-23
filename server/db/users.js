import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username : { type: String, required: true},
    wins : { type : Number, required: true}
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
