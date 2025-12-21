import React from 'react'
import ClaudeRecipe from "./ClaudeRecipe"
import GetRecipe from './GetRecipe'
import generateRecipe from '../api'
// import { IoIosCloseCircle } from "react-icons/io";

export default function Content() {
    /* State management:
        - store entered ingredients
        - handle AI-generated recipe
        - show message if input <2 characters
        - Disable 'Get Recipe' button after generating recipe to prevent duplicate calls.
    */
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [showMessage, setShowMessage] = React.useState(false)
    const [isRecipeGenerated, setIsRecipeGenerated] = React.useState(false)

    // Handle storing ingredients to array in state
    function addIngredient(formData) {
        const ingredient = formData.get('ingredient').trim().toLowerCase()

        // If input is <3 characters then show message
        if(ingredient.length < 3) {
           return setShowMessage(true)
        } else {
            setShowMessage(false)
        }

        // Prevent adding duplicate ingredients to the list & activate 'Get Recipe' button
        if(!ingredients.includes(ingredient)) {
            setIngredients(prevIngredients => (
                [
                    ...prevIngredients,
                    ingredient
                ]
            ))
            if(isRecipeGenerated) {
                setIsRecipeGenerated(false)
            }
        }
    }

    // Handle generating ingredients list items
    const ingredientEls = ingredients.map((ingredient) => (
        <li key={ingredient}>
            {ingredient[0].toUpperCase() + ingredient.slice(1)} 
            {/* {<button onClick={handleDeleteIngredient} className='delete-ingredient'><IoIosCloseCircle size={25} /></button>} */}
        </li>
    ))

    // Pass ingredients to the function and generate a recipe using AI
    async function getRecipeFromAi() {
        const res = await generateRecipe(ingredients)
        setRecipe(res.content)

        !!recipe && setIsRecipeGenerated(true)
    }

    return (
        <main>
            {/* Taking input(ingredient) from the user */}
            <div className='user-input-form-container'>
                <form action={addIngredient} className="form">
                    <input 
                        type="text" 
                        placeholder="e.g. oregano"
                        aria-label="Enter ingredients name"
                        name="ingredient"
                        required
                        aria-required="true"
                        autoComplete='off'
                        pattern='[a-zA-Z ]+'
                        />
                        {/* Add ingredient button */}
                    <button type="submit" className="add-ingredient-btn">Add ingredient</button>
                </form>
                <p className='ingredients-message'>
                    Enter at least 4 ingredients to get a recipe.
                </p>
                {
                    showMessage ? <p className='three-char-message'>Ingredient name is too short (min. 3 characters).</p> : null
                }
            </div>
            {
                // Display ingredients when user clicks 'Add Ingredient' button
                ingredients.length > 0 ? 
                <section>
                    <ul className="ingredients-list">
                        <h2>Ingredients on hand:</h2>
                        {ingredientEls}
                    </ul>
                    {
                        // Show 'Get Recipe' button once at least 4 ingredients are entered
                        ingredients.length > 3 ? 
                        <GetRecipe 
                            toggleRecipeShown={getRecipeFromAi}
                            isRecipeGenerated={isRecipeGenerated}
                        /> : null
                    }
                </section> : null
            }
            {
                // Render recipe after successful generation
                recipe ? 
                    <ClaudeRecipe recipe={recipe}/> 
                : null
            }
        </main>
    )
}