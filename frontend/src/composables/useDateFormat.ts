import dayjs from "dayjs";

export const useData = (date: Date | null) => {
  if (!date) return null;

  return dayjs(date).format('DD.MM.YYYY')
}

export const useDiff = (date: Date | null) => {
  const now = dayjs();

  const target = dayjs(date);

  return now.diff(target, "day");
}

