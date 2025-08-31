/**
 * Returns a hash code from a string
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Takes a string representing a decimal number, with either a comma or a dot as
 * a decimal separator, and returns a string representing the number with
 * a dot as a decimal separator.
 */
export const normalizeDecimalNumber = (str: string): string => {
  if (str.includes(",") || str.includes(".")) {
    const [head, ...tail] = str.includes(",") ? str.split(",") : str.split(".");
    const res = [head!, tail.join()].map((w) => w.replace(/\D/g, "")).join(".");
    return res.startsWith(".") ? "0" + res : res;
  }
  return str.replace(/\D/g, "");
};

export const exchangeChars = (str: string, char1: string, char2: string) =>
  str
    .split(char1)
    .map((substr) => substr.replace(char2, char1))
    .join(char2);

export const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const toKebabCase = (str: string) =>
  removeAccents(str)
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

export const firstLetterToUpperCase = (str: string) =>
  str !== "" ? str.charAt(0).toUpperCase() + str.slice(1) : "";
