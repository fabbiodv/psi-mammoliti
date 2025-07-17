import type { Therapist } from "./types"

function generateAvailableSlots(lowAvailability: boolean = false): string[] {
  const slots: string[] = []
  const now = new Date()

  for (let day = 0; day < 7; day++) {
    const date = new Date(now)
    date.setDate(now.getDate() + day)

    // Sin fin de semana para algunos psicólogos
    if (Math.random() > 0.3 && (date.getDay() === 0 || date.getDay() === 6)) {
      continue
    }

    // Generar turnos entre las 9 y las 17
    const availableHours = [9, 10, 11, 14, 15, 16, 17]
    const filterProbability = lowAvailability ? 0.8 : 0.4 // Menos turnos para baja disponibilidad
    const daySlots = availableHours
      .filter(() => Math.random() > filterProbability)
      .map((hour) => {
        const slotDate = new Date(date)
        slotDate.setHours(hour, 0, 0, 0)
        return slotDate.toISOString()
      })

    slots.push(...daySlots)
  }

  // Para psicólogos con baja disponibilidad, limitar a máximo 3 turnos
  if (lowAvailability && slots.length > 3) {
    return slots.slice(0, 3).sort()
  }

  return slots.sort()
}

export const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Julieta Plasencia",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Ansiedad", "Depresión", "Gestión del estrés"],
    description: "Psicóloga con más de 10 años de experiencia ayudando a individuos a superar la ansiedad, la depresión y los desafíos de las relaciones. Experto en psicologia deportiva y psicología laboral. Utiliza enfoques basados en la evidencia, incluyendo Terapia Cognitivo-Comportamental (TCC) y Reducción de Estrés Basada en la Conciencia (TCC).",
    availableSlots: generateAvailableSlots(),
  },
  {
    id: "2",
    name: "Monica Perez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Terapia de parejas", "Problemas de relación", "Comunicación"],
    description: "Psicóloga especializada en terapia de parejas con más de 8 años de experiencia. Se enfoca en mejorar la comunicación entre parejas y resolver conflictos relacionales. Utiliza técnicas de terapia emocional enfocada (EFT) y terapia sistémica para ayudar a las parejas a reconstruir la conexión y la intimidad en sus relaciones.",
    availableSlots: generateAvailableSlots(true), // Baja disponibilidad
  },
  {
    id: "3",
    name: "Emilia Rodriguez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Trastorno de estrés postraumático", "Trauma", "Luto", "Ansiedad"],
    description: "Psicóloga clínica especializada en trauma y duelo con más de 12 años de experiencia. Trabaja con personas que han experimentado eventos traumáticos y pérdidas significativas. Utiliza EMDR (Desensibilización y Reprocesamiento por Movimientos Oculares) y terapia narrativa para ayudar a sus pacientes a procesar y sanar de experiencias difíciles.",
    availableSlots: generateAvailableSlots(),
  },
  {
    id: "4",
    name: "David Torres",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Adicción", "Abuso de sustancias", "Recuperación"],
    description: "Psicólogo especializado en adicciones con más de 15 años de experiencia en el tratamiento del abuso de sustancias. Trabaja con un enfoque integral que combina terapia cognitivo-conductual, terapia motivacional y programas de 12 pasos. Su experiencia incluye tanto tratamiento ambulatorio como programas de desintoxicación y rehabilitación.",
    availableSlots: generateAvailableSlots(),
  },
  {
    id: "5",
    name: "Lucas Perez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Trastornos de alimentación", "Imagen corporal", "Autoestima"],
    description: "Psicólogo especializado en trastornos alimentarios y problemas de imagen corporal con más de 9 años de experiencia. Trabaja con adolescentes y adultos que luchan contra anorexia, bulimia y trastorno por atracón. Utiliza terapia cognitivo-conductual y terapia de aceptación y compromiso para ayudar a desarrollar una relación saludable con la comida y el cuerpo.",
    availableSlots: generateAvailableSlots(true), // Baja disponibilidad
  },
  {
    id: "6",
    name: "Juan Perez",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Trastorno obsesivo-compulsivo", "Fobias", "Trastornos de ansiedad"],
    description: "Psicólogo especializado en trastornos de ansiedad con más de 11 años de experiencia. Se especializa en el tratamiento del TOC, fobias específicas y trastornos de ansiedad generalizada. Utiliza terapia de exposición y prevención de respuesta (ERP) junto con técnicas de mindfulness para ayudar a sus pacientes a superar miedos y compulsiones.",
    availableSlots: generateAvailableSlots(),
  },
  {
    id: "7",
    name: "Maria Garcia",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Depresión", "Trastorno bipolar", "Trastornos de humor"],
    description: "Psicóloga clínica especializada en trastornos del estado de ánimo con más de 13 años de experiencia. Trabaja con pacientes que sufren de depresión mayor, trastorno bipolar y otros trastornos del humor. Combina terapia cognitivo-conductual con terapia interpersonal y técnicas de regulación emocional para ayudar a estabilizar el estado de ánimo y mejorar la calidad de vida.",
    availableSlots: generateAvailableSlots(),
  },
  {
    id: "8",
    name: "Ana Garcia",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Gestión del estrés", "Equilibrio entre trabajo y vida personal", "Burnout"],
    description: "Psicóloga organizacional especializada en estrés laboral y burnout con más de 7 años de experiencia. Ayuda a profesionales a manejar el estrés del trabajo, establecer límites saludables y prevenir el agotamiento. Utiliza técnicas de mindfulness, gestión del tiempo y terapia cognitivo-conductual para mejorar el bienestar en el ámbito laboral y personal.",
    availableSlots: generateAvailableSlots(true), // Baja disponibilidad
  },
  {
    id: "9",
    name: "Amanda Foster",
    avatarUrl: "/placeholder.svg?height=100&width=100",
    specialties: ["Terapia familiar", "Crianza", "Psicología infantil"],
    description: "Psicóloga familiar y infantil con más de 10 años de experiencia trabajando con niños, adolescentes y familias. Se especializa en problemas de comportamiento, dificultades de aprendizaje y dinámicas familiares. Utiliza terapia de juego, terapia familiar sistémica y técnicas de modificación de conducta para ayudar a las familias a desarrollar relaciones más saludables y efectivas.",
    availableSlots: generateAvailableSlots(),
  },
]
