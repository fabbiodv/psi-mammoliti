"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, Home, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockTherapists } from "@/lib/mock-data"
import { formatTime, formatDate } from "@/lib/utils"

export default function BookingSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const therapistId = searchParams.get("therapist")
  const slot = searchParams.get("slot")

  const therapist = therapistId ? mockTherapists.find((t) => t.id === therapistId) : null

  if (!therapist || !slot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Información de la sesión no encontrada</p>
          <Button onClick={() => router.push("/")}>Volver a la página principal</Button>
        </div>
      </div>
    )
  }

  const handleAddToCalendar = () => {
    const startDate = new Date(slot)
    const endDate = new Date(startDate.getTime() + 45 * 60 * 1000) // 45 minutes later

    const title = `Sesión con ${therapist.name}`
    const details = `Sesión de psicología con ${therapist.name}. Se te enviará un link de llamada 15 minutos antes de la sesión.`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(details)}`

    window.open(googleCalendarUrl, "_blank")
  }

  return (
    <div className="flex items-center justify-center ">
      <Card className="w-full max-w-md my-5">
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold mb-2">Sesión agendada!</h1>
          <p className="mb-8">Tu sesión ha sido agendada exitosamente.</p>

          {/* Booking Details */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={therapist.avatarUrl || "/placeholder.svg"} alt={therapist.name} />
                <AvatarFallback>
                  {therapist.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium">{therapist.name}</p>
                <p className="text-sm">Lic. en Psicología</p>
              </div>
            </div>

            <div className="p-4 rounded-lg text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Fecha</span>
                <span className="text-sm font-medium">{formatDate(slot)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Hora</span>
                <span className="text-sm font-medium">{formatTime(slot)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Duración</span>
                <span className="text-sm font-medium">45 minutos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Tipo</span>
                <span className="text-sm font-medium">Sesión online</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-sm text-gray-600 mb-8 text-left">
            <h3 className="font-medium mb-2">¿Qué pasa a continuación?</h3>
            <ul className="space-y-1">
              <li>• Recibirás un correo de confirmación en breve</li>
              <li>• Se te enviará un link de llamada 15 minutos antes de tu sesión</li>
              <li>• Por favor, uníte a la llamada 5 minutos antes</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleAddToCalendar} className="w-full bg-violet-900 hover:bg-violet-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Agregar al calendario
            </Button>

            <Button variant="outline" onClick={() => router.push("/find")} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Volver a la página principal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
