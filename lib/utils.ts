import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { AvailabilitySlot, SessionModality } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export function hasEnvVars() {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY
  );
}

/**
 * Redirige al usuario después del login de manera robusta
 * Usa window.location.href para forzar navegación del lado del servidor
 * Esto resuelve problemas de sincronización de cookies en producción
 */
export function redirectAfterAuth(path: string) {
  if (typeof window !== 'undefined') {
    // Función para verificar si la redirección fue exitosa
    const checkAndRedirect = (attempt = 1) => {
      try {
        // Si ya estamos en la página destino, no redirigir
        if (window.location.pathname === path) {
          return;
        }
        
        // Intentar redirección
        window.location.href = path;
        
        // Verificar después de un tiempo si la redirección funcionó
        setTimeout(() => {
          if (window.location.pathname !== path && attempt < 3) {
            console.log(`Reintentando redirección (intento ${attempt + 1})`);
            checkAndRedirect(attempt + 1);
          }
        }, 1000);
        
      } catch (error) {
        console.error('Error en redirección:', error);
        // Como fallback, intentar con replace
        if (attempt < 3) {
          setTimeout(() => {
            try {
              window.location.replace(path);
            } catch {
              // Si todo falla, recargar la página
              window.location.reload();
            }
          }, 1000);
        }
      }
    };
    
    // Pequeña demora para asegurar que las cookies se establezcan
    setTimeout(() => {
      checkAndRedirect();
    }, 100);
  }
}


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

export function generateWeeklySlotsWithModality(availableSlots: AvailabilitySlot[], selectedModality?: SessionModality): AvailabilitySlot[][] {
  const today = new Date()
  const weekSlots: AvailabilitySlot[][] = Array.from({ length: 7 }, () => [])

  availableSlots.forEach((slot) => {
    // Filter by modality if specified
    if (selectedModality && slot.modality !== selectedModality) {
      return
    }

    const slotDate = new Date(slot.datetime)
    const daysDiff = Math.floor((slotDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff >= 0 && daysDiff < 7) {
      weekSlots[daysDiff].push(slot)
    }
  })

  // Sort each day's slots by time
  weekSlots.forEach(daySlots => {
    daySlots.sort((a, b) => a.datetime.localeCompare(b.datetime))
  })

  return weekSlots
}