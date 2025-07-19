import { Suspense } from "react"
import { getTherapists, getAvailableSpecialties } from "@/lib/database"
import { TherapistSearchClient } from "@/components/therapist-search-client"

export default async function HomePage() {
  const [therapists, specialties] = await Promise.all([
    getTherapists(),
    getAvailableSpecialties()
  ])

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <TherapistSearchClient 
        initialTherapists={therapists} 
        availableSpecialties={specialties} 
      />
    </Suspense>
  )
}