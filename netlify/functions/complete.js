// netlify/functions/complete.js
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,  // hent fra miljø
});

const SYSTEM_PROMPT = `
Du er en assistent som mottar en liste over ingredienser en bruker har, og foreslår en oppskrift 
de kan lage med noen eller alle ingrediensene. 
Du trenger ikke å bruke alle ingrediensene brukeren nevner i oppskriften din. 
Oppskriften kan inkludere ekstra ingredienser som brukeren ikke har nevnt, 
men prøv å ikke inkludere for mange ekstra ingredienser.
Du kan anta at brukeren har basisvarer som olje, salt, pepper, mel og sukker tilgjengelig.
Du kan anta at brukeren er student og har ikke tilgang til dyre ingredienser eller avansert kjøkkenutstyr.
Formater svaret ditt i Markdown for å gjøre det enklere å vise på en nettside.
`;

export async function handler(event) {
  try {
    const { ingredients } = JSON.parse(event.body);  // frontend sender { ingredients: [...] }
    const ingredientsString = ingredients.join(", ");

    const res = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `Jeg har ${ingredientsString}. Værsåsnill gi meg en oppskrift jeg kan lage!` }
      ],
    });

    // Log the response for debugging
    console.log("Anthropic response:", JSON.stringify(res, null, 2));

    // Try to extract the recipe from different possible response structures
    let recipe = null;
    if (res.content && Array.isArray(res.content) && res.content[0]?.text) {
      recipe = res.content[0].text;
    } else if (res.choices && Array.isArray(res.choices) && res.choices[0]?.message?.content) {
      recipe = res.choices[0].message.content;
    } else {
      recipe = res;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe })
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Unknown error" })
    };
  }
}
