import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

export default async function generateRecipe(ingredients) {
    if(!ingredients) return 'Please enter some ingredients'

    try {
        const chatCompletion = await client.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
            messages: [
                {
                    role: "system",
                    content: "You are a professional chef. Your task is to generate a recipe based on the provided ingredients. Do not include ingredients that are not listed, though you may assume basic pantry staples like salt, water, or oil if absolutely necessary for cooking. Always respond in Markdown format."
                },
                {
                    role: "user",
                    content: `Generate a recipe using these ingredients: ${ingredients.join(', ')}. Include a title, measured ingredients list, and step-by-step instructions.`
                }
            ],
        });
        
        return chatCompletion.choices[0].message;
    } catch(error) {
        console.error("Error:", error)
    }
}
