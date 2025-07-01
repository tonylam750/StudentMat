
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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
  const { ingredients } = JSON.parse(event.body); 

  const ingredientsString = ingredients.join(", ");

  const res = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      { role: "user", content: `Jeg har ${ingredientsString}. Værsåsnill gi meg en oppskrift jeg kan lage!` }
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ recipe: res.content[0].text })
  };
}
