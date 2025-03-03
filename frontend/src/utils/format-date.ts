import { format, formatDistanceToNow, isBefore, subWeeks } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (date: Date): string => {
  const oneWeekAgo = subWeeks(new Date(), 1);

  if (isBefore(date, oneWeekAgo)) {
    return format(date, "MMM dd, yyyy", { locale: enUS });
  }

  return `${formatDistanceToNow(date, { addSuffix: true, locale: enUS })}`;
};
