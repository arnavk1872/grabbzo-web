import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDaysLeft(expiryDateStr: string): string {
  const expiryDate = new Date(expiryDateStr);
  const now = new Date();

  const timeDiff = expiryDate.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return "Plan Expired";
  if (daysLeft === 0) return "Expires today";
  if (daysLeft === 1) return "1 day left";
  return `${daysLeft}`;
}