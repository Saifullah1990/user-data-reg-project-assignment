import mongoose from "mongoose"; 
const userSchema = new mongoose.Schema(
    {
        email: {type: String, unique: true, required: true},
        firstName: {type: String, required: true}, 
        lastName: {type: String, required: true}, 
        password: {type: String, required: true}, 
        NIDNumber: {type: String, required: true},
        phoneNumber: {type: String, required: true}, 
        bloodGroup: {type: String, required: true}
    }, 
    {timestamps: true, versionKey: false}
)

export default mongoose.model("users", userSchema)