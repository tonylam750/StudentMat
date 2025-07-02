import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromChefClaude } from "../ai"

export default function Content() {
    const [ingredients, setIngredients] = React.useState([]

    )
    const [recipe, setRecipe] = React.useState("")

    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeAllIngredients() {
        setIngredients([])
        setRecipe("")
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="f.eks tomat"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Legg til ingrediens</button>
            </form>

            {ingredients.length > 0 &&
                <div className="ingredient-container">
                    <button onClick={removeAllIngredients}>Fjern liste</button>
                    <IngredientsList
                        ref = {recipeSection}
                        ingredients={ingredients}
                        getRecipe={getRecipe}
                        />
                </div>
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}