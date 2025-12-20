export default function GetRecipe({toggleRecipeShown}) {
    return (
        <div className="get-recipe-container">
            <div>
                <h2>Ready for a recipe?</h2>
                <p>Generate a recipe from your list of ingredients</p>
            </div>
            <button onClick={toggleRecipeShown} className="get-recipe-btn">Get a recipe</button>
        </div>
    )
}