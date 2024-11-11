export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

export const getWeekRange = (
  weekOffset: number
): { start: Date; end: Date } => {
  const start = new Date();
  start.setDate(start.getDate() - weekOffset * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return { start, end };
};
