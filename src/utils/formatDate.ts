export const today = new Date().toLocaleDateString("en-CA");

export function formatWeekday(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    weekday: "short",
  });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function formatDMY(date: string) {
  return new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
