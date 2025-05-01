import { v4 as uuidv4 } from 'uuid'
import { SnippetModel } from '../model/snippet.model.js'

export const postSnippet = async (req, res) => {
    try {
        const { code, language, theme } = req.body

        if(!code && !language) {
            res.status(400).json({message: "Code and language are necessary"})
        }

        const uuid = uuidv4()

        const newSnippet = new SnippetModel({ uuid, code, language, theme })
        await newSnippet.save()

        res.json({message: "Snippet posted", success: true, uuid})
    } catch (error) {
        console.log("error in posting snippet", error)
        res.status(500).json({message: "Internal server error."})
    }
}

export const getSnippet = async (req, res) => {
    try {
        const { uuid } = req.params
        const snippet = await SnippetModel.findOne({uuid})
        if(!snippet) {
            return res.status(400).json({message: "Id not found."})
        }

        // console.log("Snippet found:", snippet); 
        res.json({success: true, snippet})
    } catch (error) {
        console.log("Error getting the snippet", error)
        res.status(500).json({message: "Internal server error."})
    }
}