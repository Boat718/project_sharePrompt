import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB();

        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    } catch (error) {
        return new Response("Error: " + error.message,{
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}