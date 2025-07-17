export type SessionModality = 'online' | 'presencial'

export interface AvailabilitySlot {
  datetime: string // ISO datetime string
  modality: SessionModality
}

export interface Therapist {
  id: string
  name: string
  avatarUrl: string
  specialties: string[]
  description: string
  availableSlots: AvailabilitySlot[]
  supportedModalities: SessionModality[]
}
