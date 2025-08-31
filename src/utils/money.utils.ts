import { applyDecimalScale } from "./number.utils";
import { exchangeChars } from "./string.utils";

export const Currency = {
  ARS: "ARS",
  USD: "USD",
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];

export const formatMoney = (
  amount: number | string,
  {
    currency = Currency.ARS,
    inputDecimalScale = 2,
    decimalScale = 2,
    locale = "es-AR",
    swapDelimiters = false,
  }: Partial<{
    currency: Currency | null;
    inputDecimalScale: number;
    decimalScale: number;
    locale: string;
    swapDelimiters: boolean;
  }> = {}
) => {
  let amountToFormat = typeof amount === "string" ? parseFloat(amount) : amount;
  if (inputDecimalScale !== 0) {
    const [integerPart, decimalPart] = applyDecimalScale(
      amountToFormat,
      inputDecimalScale
    );
    amountToFormat = parseFloat(
      integerPart + (decimalPart ? `.${decimalPart}` : "")
    );
  }
  const numberFormat =
    currency !== null
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          minimumFractionDigits: decimalScale,
          maximumFractionDigits: decimalScale,
        })
      : new Intl.NumberFormat(locale, {
          style: "decimal",
          minimumFractionDigits: decimalScale,
          maximumFractionDigits: decimalScale,
        });
  const formattedAmount = numberFormat.format(amountToFormat);
  return swapDelimiters
    ? exchangeChars(formattedAmount, ".", ",")
    : formattedAmount;
};

export const parseMoney = (
  amount: string,
  { decimalSeparator = ",", decimalScale = 2 } = {}
) => {
  const isNegative = amount.startsWith("-");
  const [int, frac] = amount.split(decimalSeparator);
  return (
    (isNegative ? -1 : 1) *
    (parseInt(int!.replace(/[^0-9]/g, "")) * Math.pow(10, decimalScale) +
      (frac
        ? parseInt(frac.replace(/[^0-9]/g, "")) * Math.pow(10, decimalScale - 2)
        : 0))
  );
};

export const sumMoney = (
  amounts: { amount: number; currency: Currency }[],
  defaultValue = { amount: 0, currency: Currency.ARS }
) => {
  const result: { [key in Currency]?: number } = {};
  for (const { amount, currency } of amounts) {
    if (currency in result) {
      result[currency]! += amount;
    } else {
      result[currency] = amount;
    }
  }

  const resultAsArray = Object.entries(result).map(([currency, amount]) => ({
    currency: currency as Currency,
    amount,
  }));
  return resultAsArray.length > 0 ? resultAsArray : [defaultValue];
};
