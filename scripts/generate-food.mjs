// Generated outputs have white backgrounds; remove those before replacing the deployed transparent cutouts.
import { GoogleGenAI } from "@google/genai";
import { writeFile } from "node:fs/promises";
const ai = new GoogleGenAI({
  apiKey: process.env.NETLIFY_AI_GATEWAY_KEY,
  httpOptions: {
    baseUrl: process.env.NETLIFY_AI_GATEWAY_URL?.replace(/\/$/, ""),
  },
});
const foods = {
  cookie:
    "A cluster of eight tiny round bite-sized chocolate chip cookie bites, each about two centimeters wide, golden baked dough with chocolate chips, one small bite broken open, clearly individual mini cookies, no full size cookie, three quarter angle",
  brownie:
    "A small dramatic stack of two thick fudgy dark chocolate brownies, cracked shiny top, melting dark chocolate dripping over the edge, delicious moist interior, three quarter view",
  fries:
    "Japanese long fries, six extremely long straight uniform golden fried mashed-potato sticks, each thirty centimeters long and one centimeter thick, parallel rigid sticks extending far above a short plain pink paper cup, lengths at least four times cup height, all six ends visible, no ordinary short french fries, three quarter view",
  corn: "A paper cup of glossy golden buttered sweetcorn kernels, a little melted butter and parsley, plain pale pink paper cup with no text, spoon of corn floating above, three quarter view",
};
await Promise.all(
  Object.entries(foods)
    .filter(
      ([name]) =>
        !process.argv.includes("--corrections") ||
        ["cookie", "fries"].includes(name),
    )
    .map(async ([name, food]) => {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image",
          contents: `Professional premium food advertising cutout photograph. ${food}. Centered isolated on a completely flat pure white background, NO horizon, NO surface, NO shadows on background, NO text, NO graphics, food occupies 85 percent of square canvas. Hyper realistic crispy texture, warm studio light, appetizing macro detail.`,
          config: { responseModalities: ["IMAGE"] },
        });
        const part = response.candidates?.[0]?.content?.parts?.find(
          (p) => p.inlineData,
        );
        if (part?.inlineData) {
          await writeFile(
            `public/img/${name}.png`,
            Buffer.from(part.inlineData.data, "base64"),
          );
          console.log(`${name} saved`);
        } else console.log(`${name} missing`);
      } catch {
        console.log(`${name} generation failed`);
      }
    }),
);
