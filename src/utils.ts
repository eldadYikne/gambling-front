import { Game } from "./types/game";

export function getCurrentDate(date: string): string {
  const newDate: Date = new Date(date);
  const year: number = newDate.getFullYear();
  let month: number | string = newDate.getMonth() + 1;
  let day: number | string = newDate.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day}/${month}/${year}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Check if the date is today or tomorrow
  if (date.toDateString() === now.toDateString()) {
    return `Today ${hours}:${minutes}`;
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow ${hours}:${minutes}`;
  }

  const dayName = date.toLocaleString("en-US", { weekday: "long" });
  return `${dayName} ${hours}:${minutes}`;
}
export const sortGamesByAZ = (games: Game[], sortBy: string) => {
  return games.sort((a: Game, b: Game) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return sortBy === "AZ"
      ? textA < textB
        ? -1
        : textA > textB
        ? 1
        : 0
      : textB < textA
      ? -1
      : textB > textA
      ? 1
      : 0;
  });
};
export function generateRandomId(length = 15) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
