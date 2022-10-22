import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    contact: String,
    name: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostContact = mongoose.model('PostContact', postSchema)

export default PostContact;