export const applyDecimalScale = (
  number: number | string,
  decimalScale: number,
): [string, string] => {
  const numberAsNumber =
    typeof number === "string" ? parseFloat(number) : number;
  if (isNaN(numberAsNumber)) {
    throw new Error("Invalid number");
  }
  const sign = numberAsNumber < 0 ? "-" : "";
  const numberParts = Math.abs(numberAsNumber).toString().split(".");
  const joinedNumberParts = numberParts.join("");
  const pointIndex = Math.max(0, numberParts[0]!.length - decimalScale);
  const integerPart =
    joinedNumberParts.slice(0, pointIndex) +
      (pointIndex > joinedNumberParts.length
        ? "0".repeat(pointIndex - joinedNumberParts.length)
        : "") || "0";
  const decimalPart = joinedNumberParts
    .slice(pointIndex)
    .padStart(decimalScale, "0");
  return [sign + integerPart, decimalPart];
};

export const parseNumber = (
  number: string,
  {
    decimalScale = 0,
    decimalSeparator = ",",
  }: {
    decimalScale?: number;
    decimalSeparator?: string;
  } = {},
): number => {
  const [inputIntegerPart, inputDecimalPart] = number
    .replace(new RegExp(`[^\\d${decimalSeparator}]`, "g"), "")
    .split(decimalSeparator);
  const integerPart =
    inputIntegerPart +
    (inputDecimalPart ?? "").slice(0, decimalScale).padEnd(decimalScale, "0");
  if (inputDecimalPart) {
    const decimalPart = inputDecimalPart.slice(decimalScale);
    return parseFloat(integerPart + "." + decimalPart);
  } else {
    return parseInt(integerPart, 10);
  }
};

export const formatWithDecimalScale = (
  number: number | string,
  decimalScale: number,
  { decimalSeparator = ",", removeTrailingZeros = false } = {},
): string => {
  const [integerPart, decimalPart] = applyDecimalScale(number, decimalScale);
  const formattedDecimalPart = removeTrailingZeros
    ? decimalPart.replace(/0+$/, "")
    : decimalPart;
  return formattedDecimalPart
    ? `${integerPart}${decimalSeparator}${formattedDecimalPart}`
    : integerPart;
};
