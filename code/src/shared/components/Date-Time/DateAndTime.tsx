export const formatDateTH = (dateString?: string | null): string => {
    if (!dateString) return "-";

    const [year, month, day] = dateString.split("-");

    return `${day}/${month}/${year}`;
};

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

export const formatDateTimeThai = (unixtime?: number | null) => {
    if (!unixtime) return "-";

    const date = new Date(unixtime * 1000);

    const dateText = date.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const timeText = date.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).replace(":", ".");

    return `${dateText} เวลา ${timeText}`;
};