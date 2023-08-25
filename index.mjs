#!/usr/bin/env node

import readline from "readline";
import { createCanvas, loadImage } from "canvas";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function cardNotationToFile(card) {
  let value = card.substring(0, card.length - 1);
  let suit = card.charAt(card.length - 1);

  switch (value) {
    case "A":
      value = "ace";
      break;
    case "K":
      value = "king";
      break;
    case "Q":
      value = "queen";
      break;
    case "J":
      value = "jack";
      break;
    default:
      break;
  }

  switch (suit) {
    case "S":
      suit = "spades";
      break;
    case "H":
      suit = "hearts";
      break;
    case "D":
      suit = "diamonds";
      break;
    case "C":
      suit = "clubs";
      break;
    default:
      throw new Error("Invalid card suit");
  }

  return `${value}_of_${suit}.png`;
}

async function generateCardImage(cards) {
  const CARD_WIDTH = 100; // Adjust as per your images
  const CARD_HEIGHT = 150; // Adjust as per your images

  const canvas = createCanvas(cards.length * CARD_WIDTH, CARD_HEIGHT);
  const ctx = canvas.getContext("2d");

  for (let i = 0; i < cards.length; i++) {
    const cardFile = cardNotationToFile(cards[i]);
    const cardImagePath = path.join(__dirname, "card-images", cardFile); // Assuming card images are in a folder named "card-images"
    const image = await loadImage(cardImagePath);
    ctx.drawImage(image, i * CARD_WIDTH, 0, CARD_WIDTH, CARD_HEIGHT);
  }

  return canvas.toBuffer();
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
//
// rl.question(
//   'Enter cards (comma-separated, like "4D,JC,9D"): ',
//   async (cardsInput) => {
//     // ... some code ...
//     const terminalImage = await import("terminal-image");
//     // const result = terminalImage.default.buffer(imageBuffer);
//
//     const cards = cardsInput
//       .split(",")
//       .map((card) => card.trim().toUpperCase());
//     const imageBuffer = await generateCardImage(cards);
//
//     // Use terminalImage.buffer here:
//     console.log(terminalImage.default.buffer(imageBuffer));
//
//     rl.close();
//   },
// );

async function main() {
  let terminalImage;

  import('terminal-image').then(module => {
    terminalImage = module;
    rl.question('Enter cards (comma-separated, like "4D,JC,9D"): ', async (cardsInput) => {
      const cards = cardsInput.split(",").map(card => card.trim().toUpperCase());
      const imageBuffer = await generateCardImage(cards);

      console.log(await terminalImage.default.buffer(imageBuffer));
      rl.close();
    });
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


}

// Invoke the main function
main();
