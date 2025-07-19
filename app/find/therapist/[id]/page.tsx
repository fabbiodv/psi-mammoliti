import { notFound } from "next/navigation"
import { getTherapistById } from "@/lib/database"
import { TherapistDetailClient } from "@/components/therapist-detail-client"

interface TherapistDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function TherapistDetailPage({ params }: TherapistDetailPageProps) {
  const { id } = await params
  const therapist = await getTherapistById(id)

  if (!therapist) {
    notFound()
  }

  return <TherapistDetailClient therapist={therapist} />
}
