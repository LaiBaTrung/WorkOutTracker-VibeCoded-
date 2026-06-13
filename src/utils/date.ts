export const toDateKey = (date = new Date()) => date.toISOString().slice(0, 10);

export const formatLongDate = (date = new Date()) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

export const getWeekDates = (date = new Date()) => {
  const current = new Date(date);
  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const next = new Date(monday);
    next.setDate(monday.getDate() + index);
    return toDateKey(next);
  });
};

export const isSameMonth = (dateKey: string, date = new Date()) => {
  const target = new Date(`${dateKey}T00:00:00`);
  return target.getMonth() === date.getMonth() && target.getFullYear() === date.getFullYear();
};
