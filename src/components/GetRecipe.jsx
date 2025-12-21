import { useFormStatus } from 'react-dom'

// Handle click event for 'Get Recipe' button
export default function GetRecipe({generateRecipe, isRecipeGenerated}) {
    return (
        <div className="get-recipe-container">
            <div>
                <h2>Ready for a recipe?</h2>
                <p>Generate a recipe from your list of ingredients</p>
            </div>
            <form action={generateRecipe}>
                <Submit isRecipeGenerated={isRecipeGenerated} />
            </form>
        </div>
    )
}

// Get Recipe Button
function Submit({isRecipeGenerated}) {
    const { pending } = useFormStatus();

    return (
        <>
        <button 
            type='submit' 
            className="get-recipe-btn" 
            disabled={pending || isRecipeGenerated}
            style={{pointerEvents: `${pending ? 'none' : ""}`}}
            >
            {pending ? "Getting a recipe..." : "Get a recipe"}
        </button>
        </>
    )
}