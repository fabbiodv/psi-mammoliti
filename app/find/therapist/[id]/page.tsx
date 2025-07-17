"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookSessionModal } from "@/components/book-session-modal"
import { mockTherapists } from "@/lib/mock-data"
import { generateWeeklySlots, formatTime } from "@/lib/utils"

export default function TherapistDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const therapist = mockTherapists.find((t) => t.id === params.id)

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Psicólogo no encontrado</p>
          <Button onClick={() => router.push("/find")}>Volver a la página principal</Button>
        </div>
      </div>
    )
  }

  const weeklySlots = generateWeeklySlots(therapist.availableSlots)
  const today = new Date()
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    return date
  })

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot)
    setModalOpen(true)
  }

  return (
    <div className="min-h-scree">
      {/* Header */}
      <div className=" border-b bg-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/find")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a los psicólogos
          </Button>

          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={therapist.avatarUrl || "/placeholder.svg"} alt={therapist.name} />
              <AvatarFallback>
                {therapist.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{therapist.name}</h1>
              <div className="flex items-center gap-2 mt-1 mb-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm ml-1">4.9 (127 reviews)</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Online
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {therapist.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* About Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-3">Sobre {therapist.name}</h2>
            <p className="leading-relaxed">
              {therapist.description}	
            </p>
          </CardContent>
        </Card>

        {/* Availability Calendar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Horarios disponibles</h2>
            </div>

            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-4">
                {weekDays.map((date, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="text-xs flex flex-col py-3">
                    <span className="font-medium">{date.toLocaleDateString("es-ES", { weekday: "short" })}</span>
                    <span className="text-xs">{date.getDate()}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {weekDays.map((date, dayIndex) => (
                <TabsContent key={dayIndex} value={dayIndex.toString()}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {weeklySlots[dayIndex]?.map((slot) => (
                      <Button
                        key={slot}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSlotClick(slot)}
                        className="justify-center text-sm "
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(slot)}
                      </Button>
                    )) || (
                      <div className="col-span-full text-center py-8">
                          No hay turnos disponibles para este día
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <BookSessionModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        therapist={therapist}
        selectedSlot={selectedSlot}
      />
    </div>
  )
}
