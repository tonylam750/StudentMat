
export async function getRecipe(ingredients) {
  const res = await fetch("/.netlify/functions/complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients })
  });
  const { recipe } = await res.json();
  return recipe;
}
