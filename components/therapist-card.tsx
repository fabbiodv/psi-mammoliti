import Link from "next/link"
import { Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTime } from "@/lib/utils"
import type { Therapist } from "@/lib/types"

interface TherapistCardProps {
  therapist: Therapist
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  const nextSlots = therapist.availableSlots.slice(0, 3)
  const hasLimitedAvailability = therapist.availableSlots.length <= 3

  return (
    <Link href={`/find/therapist/${therapist.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={therapist.avatarUrl || "/placeholder.svg"} alt={therapist.name} />
              <AvatarFallback>
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{therapist.name}</h3>
              {hasLimitedAvailability && (
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                    Poca disponibilidad
                </Badge>
              )}
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {therapist.specialties.slice(0, 3).map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {therapist.specialties.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{therapist.specialties.length - 3} more
              </Badge>
            )}
          </div>

          {/* Next Available Slots */}
          <div>
            <p className="text-sm font-medium mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Próximos turnos disponibles
            </p>
            <div className="space-y-1">
              {nextSlots.map((slot) => (
                <div key={slot} className="text-sm">
                  {new Date(slot).toLocaleDateString("es-ES", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                  })}{" "}
                  a las {formatTime(slot)}
                </div>
              ))}
              {nextSlots.length === 0 && <div className="text-sm">No hay turnos disponibles</div>}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
