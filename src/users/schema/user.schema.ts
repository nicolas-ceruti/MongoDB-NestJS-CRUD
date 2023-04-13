import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
})
 