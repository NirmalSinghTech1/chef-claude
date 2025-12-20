import { useFormStatus } from 'react-dom'

export default function GetRecipe({toggleRecipeShown}) {
    return (
        <div className="get-recipe-container">
            <div>
                <h2>Ready for a recipe?</h2>
                <p>Generate a recipe from your list of ingredients</p>
            </div>
            <form action={toggleRecipeShown}>
                <Submit />
            </form>
        </div>
    )
}

function Submit() {
    const { pending } = useFormStatus();

    return (
        <>
        <button 
            type='submit' 
            className="get-recipe-btn" 
            disabled={pending}
            style={{pointerEvents: `${pending ? 'none' : ""}`}}
            >
            {pending ? "Getting a recipe..." :"Get a recipe"}
        </button>
        </>
    )
}