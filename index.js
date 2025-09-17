import { prompt } from "./prompt.js";

const askPasswordLength = () => {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 36;
  const length = Number(prompt("🔢 Combien de caractères ? (8-36)\n"));

  if (length < MIN_LENGTH || length > MAX_LENGTH || Number.isNaN(length)) {
    throw new Error(
      `Your password must be a number contain between ${MIN_LENGTH} and ${MAX_LENGTH} characters.`
    );
  }

  return length;
};

const isYesOrNoValue = (value) => {
  if (value.toLowerCase().startsWith("y")) {
    return true;
  } else if (value.toLowerCase().startsWith("n")) {
    return false;
  }

  throw new Error("Please answer yes (y) or no (n)");
};

const askSpecialChars = () => {
  const value = prompt("🔣 Caractères spéciaux ? (y/n)\n").toLowerCase();

  return isYesOrNoValue(value);
};

const askNumbers = () => {
  const value = prompt("🔢 Chiffres ? (y/n)\n").toLowerCase();

  return isYesOrNoValue(value);
};

const askUppercase = () => {
  const value = prompt("⬆️ Majuscules ? (y/n)\n").toLowerCase();

  return isYesOrNoValue(value);
};

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SPECIALS = "!@#$%^&*()";
const NUMBERS = "0123456789";

const generatePassword = (
  length,
  containSpecialChars,
  containNumbers,
  containUppercase
) => {
  let charset = LOWERCASE;
  if (containSpecialChars) charset += SPECIALS;
  if (containNumbers) charset += NUMBERS;
  if (containUppercase) charset += UPPERCASE;

  let password = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  if (containUppercase && password.toLowerCase() === password) {
    return generatePassword(
      length,
      containSpecialChars,
      containNumbers,
      containUppercase
    );
  }

  return password;
};

const main = () => {
  let length = null;
  let containSpecialChars = null;
  let containNumbers = null;
  let containUppercase = null;

  while (
    length === null ||
    containSpecialChars === null ||
    containNumbers === null ||
    containUppercase === null
  ) {
    try {
      length = length ? length : askPasswordLength();
      containSpecialChars = containNumbers ? containNumbers : askSpecialChars();
      containNumbers = containNumbers ? containNumbers : askNumbers();
      containUppercase = containUppercase ? containUppercase : askUppercase();
    } catch (error) {
      console.log(error.message);
    }
  }

  const password = generatePassword(
    length,
    containSpecialChars,
    containNumbers,
    containUppercase
  );

  console.log(`Votre mot de passe généré est : ${password}`);
};

main();
