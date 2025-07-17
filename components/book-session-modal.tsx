"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, User, Monitor, Users } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatTime } from "@/lib/utils"
import type { Therapist, AvailabilitySlot, SessionModality } from "@/lib/types"

interface BookSessionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  therapist: Therapist
  selectedSlot: AvailabilitySlot | null
}

export function BookSessionModal({ open, onOpenChange, therapist, selectedSlot }: BookSessionModalProps) {
  const [isBooking, setIsBooking] = useState(false)
  const router = useRouter()

  if (!selectedSlot) return null

  const slotDate = new Date(selectedSlot.datetime)
  
  const getModalityIcon = (modality: SessionModality) => {
    return modality === 'online' ? Monitor : Users
  }
  
  const getModalityLabel = (modality: SessionModality) => {
    return modality === 'online' ? 'Online' : 'Presencial'
  }

  const handleBookSession = async () => {
    setIsBooking(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsBooking(false)
    onOpenChange(false)

    // Navigate to success page
    router.push(`/find/booking-success?therapist=${therapist.id}&slot=${selectedSlot.datetime}&modality=${selectedSlot.modality}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar sesión</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Therapist Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={therapist.avatarUrl || "/placeholder.svg"} alt={therapist.name} />
              <AvatarFallback>
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{therapist.name}</h3>
              <p className="text-sm">Lic. en Psicología</p>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-3 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {slotDate.toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{formatTime(selectedSlot.datetime)} (45 minutos)</span>
            </div>

            <div className="flex items-center gap-3">
              {React.createElement(getModalityIcon(selectedSlot.modality), { className: "h-4 w-4 text-gray-500" })}
              <span className="text-sm">Sesión {getModalityLabel(selectedSlot.modality).toLowerCase()}</span>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Sesión individual</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <span className="font-medium">Costo de la sesión</span>
            <span className="text-lg font-semibold">ARS 30.000</span>
          </div>

          {/* Important Notes */}
          <div className="text-xs text-gray-600 space-y-1">
            <p>• Recibirás un link de llamada 15 minutos antes de tu sesión</p>
            <p>• Cancelación gratuita hasta 24 horas antes de tu cita</p>
            <p>• Por favor, uníte a la llamada 5 minutos antes</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1" disabled={isBooking}>
              Cancelar
            </Button>
            <Button
              onClick={handleBookSession}
              className="flex-1 bg-violet-900 hover:bg-violet-700 text-white"
              disabled={isBooking}
            >
              {isBooking ? "Agendando..." : "Confirmar sesión"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
