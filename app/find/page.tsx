"use client"

import { useState, useMemo } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"
import { mockTherapists } from "@/lib/mock-data"
import { TherapistCard } from "@/components/therapist-card"

const specialties = [
  "Ansiedad",
  "Depresión",
  "Terapia de parejas",
  "Trastorno de estrés postraumático",
  "Adicción",
  "Trastornos de alimentación",
  "Luto",
  "Gestión del estrés",
  "Fobias",
  "Trastorno obsesivo-compulsivo",
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredTherapists = useMemo(() => {
    return mockTherapists.filter((therapist) => {
      const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialties =
        selectedSpecialties.length === 0 ||
        selectedSpecialties.some((specialty) => therapist.specialties.includes(specialty))

      return matchesSearch && matchesSpecialties
    })
  }, [searchQuery, selectedSpecialties])

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const clearFilters = () => {
    setSelectedSpecialties([])
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10">
        <div className="bg-white dark:bg-background max-w-7xl mx-auto px-4 pt-4">
          <h1 className="text-2xl font-bold">Encontrá tu psicólogo</h1>

          {/* Search and Filter */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar psicólogos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Popover open={filterOpen} onOpenChange={setFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="shrink-0 bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                  {selectedSpecialties.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedSpecialties.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                  <CommandInput placeholder="Buscar especialidades..."/>
                  <CommandList >
                    <CommandEmpty>No se encontraron especialidades.</CommandEmpty>
                    <CommandGroup heading="Especialidades">
                      {specialties.map((specialty) => (
                        <CommandItem
                          key={specialty}
                          onSelect={() => toggleSpecialty(specialty)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 border rounded ${selectedSpecialties.includes(specialty)
                                  ? "bg-indigo-600 border-indigo-600"
                                  : "border-gray-300"
                                }`}
                            >
                              {selectedSpecialties.includes(specialty) && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                            <span>{specialty}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
                {selectedSpecialties.length > 0 && (
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full">
                      Limpiar todos los filtros
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* Active Filters */}
          {selectedSpecialties.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSpecialties.map((specialty) => (
                <Badge
                  key={specialty}
                  variant="secondary"
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialty} ×
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {filteredTherapists.length} psicólogo{filteredTherapists.length !== 1 ? "s" : ""} disponible{filteredTherapists.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </div>

        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No se encontraron psicólogos que coincidan con tus criterios</p>
            <Button variant="outline" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}