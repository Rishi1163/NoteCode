import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String
    },
    theme: {
        type: String
    }
},{timestamps: true})

export const SnippetModel = mongoose.model("Snippet", snippetSchema)