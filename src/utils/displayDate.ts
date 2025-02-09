export const displayDate = (date: string): string => {
  return new Date(date).toISOString().split('T')[0];
};
