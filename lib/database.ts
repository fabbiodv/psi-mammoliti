import { createClient } from '@supabase/supabase-js'
import type { Therapist, SessionModality } from './types'

// Helper function to get current datetime in user's timezone
function getCurrentDateTimeInUserTimezone(): string {
  const timezone = typeof window !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'America/Argentina/Buenos_Aires' // fallback for server-side

  const now = new Date()
  // Convert to user's timezone and return as ISO string
  // This ensures we filter out past slots including those from earlier today
  const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
  return localTime.toISOString()
}

// Create a single instance of the client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
)

interface DatabaseTherapist {
  id: string
  name: string
  avatar_url: string
  description: string
  supported_modalities: SessionModality[]
  therapist_specialties: Array<{
    specialties: { name: string }
  }>
  availability_slots: Array<{
    datetime: string
    modality: SessionModality
  }>
}

export async function getTherapists(): Promise<Therapist[]> {
  // Get all therapists first
  const { data: therapistsData, error: therapistsError } = await supabase
    .from('therapists')
    .select(`
      id,
      name,
      avatar_url,
      description,
      supported_modalities,
      therapist_specialties!inner (
        specialties!inner (
          name
        )
      )
    `)

  if (therapistsError) {
    console.error('Error fetching therapists:', therapistsError)
    throw therapistsError
  }

  // First get all booked datetimes to exclude them
  const { data: bookedDatetimes, error: bookedError } = await supabase
    .from('availability_slots')
    .select('datetime')
    .eq('is_booked', true)
    .gte('datetime', getCurrentDateTimeInUserTimezone())

  if (bookedError) {
    console.error('Error fetching booked datetimes:', bookedError)
    throw bookedError
  }

  const bookedDatetimeSet = new Set(bookedDatetimes?.map(slot => slot.datetime) || [])

  // Get available slots excluding those with booked datetimes
  const { data: allAvailableSlots, error: slotsError } = await supabase
    .from('availability_slots')
    .select('therapist_id, datetime, modality')
    .eq('is_booked', false)
    .gte('datetime', getCurrentDateTimeInUserTimezone())

  if (slotsError) {
    console.error('Error fetching available slots:', slotsError)
    throw slotsError
  }

  // Filter out slots with datetimes that are booked in any modality
  const availableSlots = allAvailableSlots?.filter(slot => !bookedDatetimeSet.has(slot.datetime))

  // Group slots by therapist_id
  const slotsByTherapist = new Map<string, Array<{datetime: string, modality: SessionModality}>>()
  availableSlots?.forEach(slot => {
    if (!slotsByTherapist.has(slot.therapist_id)) {
      slotsByTherapist.set(slot.therapist_id, [])
    }
    slotsByTherapist.get(slot.therapist_id)!.push({
      datetime: slot.datetime,
      modality: slot.modality as SessionModality
    })
  })

  // Transform the data to match the Therapist interface
  const therapists: Therapist[] = (therapistsData as unknown as DatabaseTherapist[])
    .filter(therapist => slotsByTherapist.has(therapist.id)) // Only include therapists with available slots
    .map((therapist) => ({
      id: therapist.id,
      name: therapist.name,
      avatarUrl: therapist.avatar_url,
      description: therapist.description,
      supportedModalities: therapist.supported_modalities,
      specialties: therapist.therapist_specialties.map((ts) => ts.specialties.name),
      availableSlots: (slotsByTherapist.get(therapist.id) || [])
        .map((slot) => ({
          datetime: slot.datetime,
          modality: slot.modality
        }))
        .sort((a, b) => a.datetime.localeCompare(b.datetime)) // Sort slots by datetime
    }))

  return therapists
}

export async function getTherapistById(id: string): Promise<Therapist | null> {
  try {
    // First get the therapist basic info
    const { data: therapistData, error: therapistError } = await supabase
      .from('therapists')
      .select(`
        id,
        name,
        avatar_url,
        description,
        supported_modalities,
        therapist_specialties!inner (
          specialties!inner (
            name
          )
        )
      `)
      .eq('id', id)
      .single()

    if (therapistError) {
      console.error('Error fetching therapist from database:', therapistError)
      return null
    }

    if (!therapistData) {
      console.log('No therapist found with id:', id)
      return null
    }

    // First get booked datetimes for this therapist
    const { data: bookedDatetimes, error: bookedError } = await supabase
      .from('availability_slots')
      .select('datetime')
      .eq('therapist_id', id)
      .eq('is_booked', true)
      .gte('datetime', getCurrentDateTimeInUserTimezone())

    if (bookedError) {
      console.error('Error fetching booked datetimes:', bookedError)
      return null
    }

    const bookedDatetimeSet = new Set(bookedDatetimes?.map(slot => slot.datetime) || [])

    // Get available slots excluding those with booked datetimes
    const { data: allAvailableSlots, error: slotsError } = await supabase
      .from('availability_slots')
      .select('datetime, modality')
      .eq('therapist_id', id)
      .eq('is_booked', false)
      .gte('datetime', getCurrentDateTimeInUserTimezone())

    if (slotsError) {
      console.error('Error fetching available slots:', slotsError)
      return null
    }

    // Filter out slots with datetimes that are booked in any modality
    const availableSlots = allAvailableSlots?.filter(slot => !bookedDatetimeSet.has(slot.datetime))

    // Transform the data to match the Therapist interface
    const transformedTherapistData = therapistData as unknown as DatabaseTherapist
    const therapist: Therapist = {
      id: transformedTherapistData.id,
      name: transformedTherapistData.name,
      avatarUrl: transformedTherapistData.avatar_url,
      description: transformedTherapistData.description,
      supportedModalities: transformedTherapistData.supported_modalities,
      specialties: transformedTherapistData.therapist_specialties.map((ts) => ts.specialties.name),
      availableSlots: (availableSlots || [])
        .map((slot) => ({
          datetime: slot.datetime,
          modality: slot.modality
        }))
        .sort((a, b) => a.datetime.localeCompare(b.datetime)) // Sort slots by datetime
    }

    return therapist
  } catch (error) {
    console.error('Unexpected error in getTherapistById:', error)
    return null
  }
}

export async function getAvailableSpecialties(): Promise<string[]> {
  const { data, error } = await supabase
    .from('specialties')
    .select('name')
    .order('name')

  if (error) {
    console.error('Error fetching specialties:', error)
    throw error
  }

  return data.map(specialty => specialty.name)
}

export async function filterTherapists(
  specialties?: string[],
  modalities?: SessionModality[]
): Promise<Therapist[]> {
  // Build therapist query with specialty filters
  let therapistQuery = supabase
    .from('therapists')
    .select(`
      id,
      name,
      avatar_url,
      description,
      supported_modalities,
      therapist_specialties!inner (
        specialties!inner (
          name
        )
      )
    `)

  // Filter by specialties if provided
  if (specialties && specialties.length > 0) {
    therapistQuery = therapistQuery.in('therapist_specialties.specialties.name', specialties)
  }

  const { data: therapistsData, error: therapistsError } = await therapistQuery

  if (therapistsError) {
    console.error('Error fetching therapists:', therapistsError)
    throw therapistsError
  }

  // First get all booked datetimes
  const { data: bookedDatetimes, error: bookedError } = await supabase
    .from('availability_slots')
    .select('datetime')
    .eq('is_booked', true)
    .gte('datetime', getCurrentDateTimeInUserTimezone())

  if (bookedError) {
    console.error('Error fetching booked datetimes:', bookedError)
    throw bookedError
  }

  const bookedDatetimeSet = new Set(bookedDatetimes?.map(slot => slot.datetime) || [])

  // Build slots query
  let slotsQuery = supabase
    .from('availability_slots')
    .select('therapist_id, datetime, modality')
    .eq('is_booked', false)
    .gte('datetime', getCurrentDateTimeInUserTimezone())

  // Filter by modalities if provided
  if (modalities && modalities.length > 0) {
    slotsQuery = slotsQuery.in('modality', modalities)
  }

  const { data: allAvailableSlots, error: slotsError } = await slotsQuery

  if (slotsError) {
    console.error('Error fetching available slots:', slotsError)
    throw slotsError
  }

  // Filter out slots with datetimes that are booked in any modality
  const availableSlots = allAvailableSlots?.filter(slot => !bookedDatetimeSet.has(slot.datetime))

  // Group slots by therapist_id
  const slotsByTherapist = new Map<string, Array<{datetime: string, modality: SessionModality}>>()
  availableSlots?.forEach(slot => {
    if (!slotsByTherapist.has(slot.therapist_id)) {
      slotsByTherapist.set(slot.therapist_id, [])
    }
    slotsByTherapist.get(slot.therapist_id)!.push({
      datetime: slot.datetime,
      modality: slot.modality as SessionModality
    })
  })

  // Transform and deduplicate therapists
  const therapistMap = new Map<string, Therapist>()

  const therapistData = therapistsData as unknown as DatabaseTherapist[]
  therapistData.forEach((therapist) => {
    // Only include therapists that have available slots
    if (!slotsByTherapist.has(therapist.id)) {
      return
    }

    if (!therapistMap.has(therapist.id)) {
      therapistMap.set(therapist.id, {
        id: therapist.id,
        name: therapist.name,
        avatarUrl: therapist.avatar_url,
        description: therapist.description,
        supportedModalities: therapist.supported_modalities,
        specialties: [],
        availableSlots: []
      })
    }

    const existingTherapist = therapistMap.get(therapist.id)!

    // Add specialties (deduplicated)
    therapist.therapist_specialties.forEach((ts) => {
      if (!existingTherapist.specialties.includes(ts.specialties.name)) {
        existingTherapist.specialties.push(ts.specialties.name)
      }
    })

    // Add availability slots
    existingTherapist.availableSlots = (slotsByTherapist.get(therapist.id) || [])
      .map((slot) => ({
        datetime: slot.datetime,
        modality: slot.modality
      }))
      .sort((a, b) => a.datetime.localeCompare(b.datetime))
  })

  return Array.from(therapistMap.values())
}

export async function bookSlot(
  therapistId: string,
  datetime: string,
  modality: SessionModality
): Promise<boolean> {
  try {
    // Normalize the datetime to ensure consistent formatting
    const normalizedDatetime = new Date(datetime).toISOString()
    
    // Find all available slots for this therapist and modality
    const { data: availableSlots, error: selectError } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('therapist_id', therapistId)
      .eq('modality', modality)
      .eq('is_booked', false)
    
    if (selectError) {
      console.error('Error fetching available slots:', selectError)
      return false
    }
    
    if (!availableSlots || availableSlots.length === 0) {
      console.error('No available slots found for therapist and modality')
      return false
    }
    
    // Find the matching slot by comparing normalized datetime
    const matchingSlot = availableSlots.find(slot => {
      const slotNormalized = new Date(slot.datetime).toISOString()
      return slotNormalized === normalizedDatetime
    })
    
    if (!matchingSlot) {
      console.error('No matching slot found for the specified datetime')
      console.log('Available slots:', availableSlots.map(s => ({ datetime: s.datetime, normalized: new Date(s.datetime).toISOString() })))
      console.log('Looking for normalized datetime:', normalizedDatetime)
      return false
    }

    // Double-check the slot is still available before updating
    const { data: recheckSlot, error: recheckError } = await supabase
      .from('availability_slots')
      .select('*')
      .eq('id', matchingSlot.id)
      .single()

    if (recheckError) {
      console.error('Error rechecking slot:', recheckError)
      return false
    }

    if (recheckSlot.is_booked) {
      console.error('Slot was already booked by another user')
      return false
    }

    // Update the specific slot using its ID only
    const { data, error } = await supabase
      .from('availability_slots')
      .update({ is_booked: true })
      .eq('id', matchingSlot.id)
      .select()

    if (error) {
      console.error('Error booking slot:', error)
      return false
    }

    if (!data || data.length === 0) {
      console.error('No slots were updated. The slot might have been booked by another user.')
      
      // Let's check the current state of the slot after failed update
      await supabase
        .from('availability_slots')
        .select('*')
        .eq('id', matchingSlot.id)
        .single()
      
      return false
    }

    console.log('Successfully booked slot:', { therapistId, datetime: matchingSlot.datetime, modality, updatedRows: data })
    return true
  } catch (error) {
    console.error('Booking error:', error)
    return false
  }
}