

export const formatDateThai = (dateString: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatTimeRange = (start: string, end: string) => {
  if (!start || !end) return "-";
  return `${start} - ${end}`;
};