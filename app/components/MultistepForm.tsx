"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"

type Category = "Top" | "Bottom" | "Accessories" | "Shoes"

interface MultistepCardProps {
  onClose: () => void
  onComplete: (selection: { category: Category; itemId: string }) => void
}

export default function MultistepCard({ onClose, onComplete }: MultistepCardProps) {
  const [step, setStep] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  const categories: Category[] = ["Top", "Bottom", "Accessories", "Shoes"]

  // Mock items data - in a real app, this would come from an API or props
  const items = [
    { id: "1", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "2", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "3", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "4", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "5", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "6", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "7", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "8", category: "Top", imageUrl: "/uploads/jacket.jpg" },
    { id: "9", category: "Top", imageUrl: "/uploads/jacket.jpg" },
  ]

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    setStep(2)
  }

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId)
  }

  const handleConfirm = () => {
    if (selectedCategory && selectedItemId) {
      //setStep(3)
      onComplete({ category: selectedCategory, itemId: selectedItemId })
    }
  }

  const handleComplete = () => {
    if (selectedCategory && selectedItemId) {
      onComplete({ category: selectedCategory, itemId: selectedItemId })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const selectedItem = selectedItemId ? items.find((item) => item.id === selectedItemId) : null

  return (
    <Card className="w-full max-w-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
      <CardContent className="p-0">
        {/* Close button - available at all steps */}
        <button onClick={onClose} className="absolute right-3 top-3 z-10" aria-label="Close">
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="p-6">
            <h2 className="text-sm text-gray-500 mb-4">Categoria</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Item Selection */}
        {step === 2 && selectedCategory && (
          <div className="p-6">
            <h2 className="text-sm text-gray-500 mb-4">Seleciona a peça correspondente</h2>
            <div className="mb-2 font-medium">{selectedCategory}</div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {items
                .filter((item) => item.category === selectedCategory)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`
                      cursor-pointer border rounded-md overflow-hidden
                      ${selectedItemId === item.id ? "ring-2 ring-black" : ""}
                    `}
                    onClick={() => handleItemSelect(item.id)}
                  >
                    <img
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={`${selectedCategory} item ${item.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
              <Button
                variant="default"
                className="bg-black text-white hover:bg-gray-800"
                onClick={handleConfirm}
                disabled={!selectedItemId}
              >
                Confirmar
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation 
        {step === 3 && selectedItem && (
          <div className="p-6">
            <div className="mb-4">
              <img
                src={selectedItem.imageUrl || "/placeholder.svg"}
                alt={`Selected ${selectedCategory}`}
                className="w-32 h-32 object-cover rounded-md mx-auto"
              />
              <div className="mt-2 text-center">
                <div className="font-medium text-lg">Gatinho</div>
                <div className="text-sm text-gray-500">Toca para editar</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 text-center">Peça amazing</div>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Voltar
              </Button>
              <Button variant="default" className="bg-black text-white hover:bg-gray-800" onClick={handleComplete}>
                Finalizar
              </Button>
            </div>
          </div>
        )}*/}
      </CardContent>
    </Card>
  )
}
