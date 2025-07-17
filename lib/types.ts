export interface Therapist {
  id: string
  name: string
  avatarUrl: string
  specialties: string[]
  description: string
  availableSlots: string[] // ISO datetime strings
}
