import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';
export const GET = async (req, res, next) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        
        return new Response(JSON.stringify(prompts),{
            status: 200,
            headers: {'Content-Type': 'application/json', "Cache-Control":"no-cache, no-store, max-age=0, must-revalidate"}
        })
        
    } catch (error) {
        return new Response("Failed to fetch all prompts",{
            status: 500,
            headers: {'Content-Type': 'application/json'}
        })
    }
}