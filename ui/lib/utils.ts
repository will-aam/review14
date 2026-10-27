import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes Tailwind de forma segura resolvendo conflitos de especificidade
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
