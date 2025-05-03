"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

type Category = "Top" | "Bottom" | "Accessories" | "Shoes"

interface AnotationEditCardProps {
  onClose: () => void
  onEdit: () => void
}

export default function AnotationEditCard({ onClose, onEdit }: AnotationEditCardProps) {
  const [step, setStep] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  return (
    <Card className="w-full max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
      <CardContent className="">
          <button onClick={onClose} className="absolute right-3 top-3 z-10" aria-label="Close">
          <X className="h-8 w-8 text-gray-500" />
          </button>
    <div className="p-4">
        <div>
        <img
            src={ "/uploads/pants.jpg"}
            alt={`Selected ${selectedCategory}`}
            className="w-64 h-64 object-cover rounded-md mx-auto"
        />
        <div className="mt-8 text-center">
            <div className="font-medium text-md">Peça</div>
            <div className="font-regular text-gray-400 text-sm pb-4">Categoria</div>

            <Button variant="outline" className="w-full mt-2" onClick={() => onEdit}>
                Edit
              </Button>
        </div>
        </div>
    </div>
    </CardContent>
    </Card>
  )
}
