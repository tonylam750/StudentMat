export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section >
            <h2>Ingredienter tilgjengelige:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 2 && <div className="get-recipe-container">
                <div>
                    <h3>Klar for en oppskrift?</h3>
                    <p>Generer en oppskrift fra din liste av ingredienter.</p>
                </div>
                <button onClick={props.getRecipe}>Få oppskrift</button>
            </div>}
        </section>
    )
}