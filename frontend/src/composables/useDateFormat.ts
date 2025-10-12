import dayjs from "dayjs";

export const useDate = (date: Date | null, formatVal: string = 'DD.MM.YYYY') => {
  if (!date) return null;

  return dayjs(date).format(formatVal)
}

export const useDiff = (date: Date | null) => {
  const now = dayjs();

  const target = dayjs(date);

  return now.diff(target, "day");
}

