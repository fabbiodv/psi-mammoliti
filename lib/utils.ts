import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;


export function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
}

export function generateWeeklySlots(availableSlots: string[]): string[][] {
  const today = new Date()
  const weekSlots: string[][] = Array.from({ length: 7 }, () => [])

  availableSlots.forEach((slot) => {
    const slotDate = new Date(slot)
    const daysDiff = Math.floor((slotDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff >= 0 && daysDiff < 7) {
      weekSlots[daysDiff].push(slot)
    }
  })

  return weekSlots
}