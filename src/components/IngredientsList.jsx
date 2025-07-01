export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section >
            <h2>Ingredienser tilgjengelige:</h2>
            <ul className="ingredients-list">{ingredientsListItems}</ul>
            {props.ingredients.length > 0 && <div className="get-recipe-container">
                <div>
                    <h3>Klar for en oppskrift?</h3>
                    <p>Generer en oppskrift fra din liste av ingredienter.</p>
                </div>
                <button onClick={props.getRecipe}>Hent oppskrift</button>
            </div>}
        </section>
    )
}