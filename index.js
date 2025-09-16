import { prompt } from "./prompt.js";

const MAX_LENGTH = 36;
const MIN_LENGTH = 8;

const numberOfCharacters = prompt("🔢 Combien de caractères ? (8-36)\n");

const createRandomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(chars.length);
  return result;
};

const password = createRandomString(numberOfCharacters);

console.log(`Nouveau mot de passe: ${password}`);
