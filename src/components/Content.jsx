import React from 'react'
import ClaudeRecipe from "./ClaudeRecipe"
import GetRecipe from './GetRecipe'
import generateRecipe from '../api'

export default function Content() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [showMessage, setShowMessage] = React.useState(false)

    function addIngredient(formData) {
        const ingredient = formData.get('ingredient').trim().toLowerCase()
        if(ingredient.length < 3) {
           return setShowMessage(true)
        } else {
            setShowMessage(false)
        }

        if(!ingredients.includes(ingredient)) {
            setIngredients(prevIngredients => (
                [
                    ...prevIngredients,
                    ingredient
                ]
            ))
        }
    }

    const ingredientEls = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient[0].toUpperCase() + ingredient.slice(1)}</li>
    ))

    async function getRecipeFromAi() {
        const res = await generateRecipe(ingredients)
        setRecipe(res.content)
    }

    return (
        <main>
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
                        pattern='[a-zA-Z]+'
                        />
                    <button type="submit" className="add-ingredient-btn">Add ingredient</button>
                </form>
                <p className='ingredients-message'>Enter at least 4 ingredients to get a recipe.</p>
                {
                    showMessage ? <p className='three-char-message'>Ingredient name is too short (min. 3 characters).</p> : null
                }
            </div>
            {
                ingredients.length > 0 ? 
                <section>
                    <ul className="ingredients-list">
                        <h2>Ingredients on hand:</h2>
                        {ingredientEls}
                    </ul>
                    {
                        ingredients.length > 3 ? 
                        <GetRecipe 
                            toggleRecipeShown={getRecipeFromAi}
                        /> : null
                    }
                </section> : null
            }
            {recipe ? 
                <ClaudeRecipe recipe={recipe}/> 
            : null}
        </main>
    )
}