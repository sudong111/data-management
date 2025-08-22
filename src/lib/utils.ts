import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRate(price: number, current_price: number) {
    const rate = ((current_price - price) / price) * 100;
    return Number(rate.toFixed(2));
  };
