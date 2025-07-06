import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getContacts() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("contacts");
  return data ? JSON.parse(data) : [];
}

export function saveContacts(contacts) {
  if (typeof window !== "undefined") {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}
