import dayjs from "dayjs";

export type FormatDateOptions = {
  format?: string;
  utc?: boolean;
  keepLocalTime?: boolean;
};

export type DayValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const daysOfWeek: {
  label: string;
  value: DayValue;
  order: number;
}[] = [
  {
    label: "Domingo",
    value: 0,
    order: 0,
  },
  {
    label: "Lunes",
    value: 1,
    order: 1,
  },
  {
    label: "Martes",
    value: 2,
    order: 2,
  },
  {
    label: "Miércoles",
    value: 3,
    order: 3,
  },
  {
    label: "Jueves",
    value: 4,
    order: 4,
  },
  {
    label: "Viernes",
    value: 5,
    order: 5,
  },
  {
    label: "Sábado",
    value: 6,
    order: 6,
  },
];

export const formatUnixDate = (
  date: number,
  {
    format = "DD/MM/YYYY",
    utc = false,
    keepLocalTime = false,
  }: FormatDateOptions = {}
) => {
  const dayJsDate = utc
    ? dayjs.unix(date).utc(keepLocalTime)
    : dayjs.unix(date);
  return dayJsDate.format(format);
};

export const formatUnixDateTime = (
  date: number,
  { format = "DD/MM/YYYY HH:mm", ...options }: FormatDateOptions = {}
) => {
  return formatUnixDate(date, { format, ...options });
};

export const formatUnixDateWithFromNow = (
  date: number,
  { format = "DD/MM/YYYY", utc = false }: FormatDateOptions = {}
) => {
  const dayJsDate = utc ? dayjs.unix(date).utc() : dayjs.unix(date);
  return `${dayJsDate.format(format)} (${dayJsDate.fromNow()})`;
};

export const formatIsoDate = (
  date: string,
  { format = "DD/MM/YYYY", utc, keepLocalTime }: FormatDateOptions = {}
) => {
  const dayJsDate = utc ? dayjs(date).utc(keepLocalTime) : dayjs(date);
  return dayJsDate.format(format);
};

export const formatIsoDateTime = (
  date: string,
  { format = "DD/MM/YYYY HH:mm", ...options }: FormatDateOptions = {}
) => formatIsoDate(date, { format, ...options });

export const formatIsoDateWithFromNow = (
  date: string,
  format = "DD/MM/YYYY"
) => {
  const dayJsDate = dayjs(date);
  return `${dayJsDate.format(format)} (${dayJsDate.fromNow()})`;
};

export const formatDate = (
  date: string,
  inputFormat = "YYYY-MM-DD",
  outputFormat = "DD/MM/YYYY"
) => {
  const dayJsDate = dayjs(date, inputFormat);
  return dayJsDate.format(outputFormat);
};

export const isDateAfter = (
  date1: string | number,
  date2: string | number = new Date().toISOString()
): boolean => {
  const dayJsDate1 = dayjs(date1);
  const dayJsDate2 = dayjs(date2);

  return dayJsDate1.isAfter(dayJsDate2);
};

export const getDaysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const incrementDateByDays = (date: Date, daysToAdd: number): Date => {
  const modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
  return modifiedDate;
};

export const decrementDateByDays = (
  date: Date,
  daysToSubstract: number
): Date => {
  const modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() - daysToSubstract);
  return modifiedDate;
};
