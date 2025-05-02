"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Camera, X, ArrowLeft, Upload, Check, Palette } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group"

// Color extraction function
const extractDominantColor = async (imageUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    
    if (typeof window === "undefined") {
        resolve("#888888")
        return
      }
  
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.src = imageUrl
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = img.width
      canvas.height = img.height

      ctx?.drawImage(img, 0, 0, img.width, img.height)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data
      if (!imageData) {
        resolve("#888888") // Default gray if we can't extract
        return
      }

      // Simple color extraction - average the middle portion of the image
      const middleX = Math.floor(canvas.width / 2)
      const middleY = Math.floor(canvas.height / 2)
      const sampleSize = 10

      let r = 0,
        g = 0,
        b = 0
      let count = 0

      for (let y = middleY - sampleSize; y < middleY + sampleSize; y++) {
        for (let x = middleX - sampleSize; x < middleX + sampleSize; x++) {
          if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            const i = (y * canvas.width + x) * 4
            r += imageData[i]
            g += imageData[i + 1]
            b += imageData[i + 2]
            count++
          }
        }
      }

      r = Math.floor(r / count)
      g = Math.floor(g / count)
      b = Math.floor(b / count)

      resolve(`#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`)
    }

    img.onerror = () => {
      resolve("#888888") // Default gray on error
    }
  })
}

export default function AddClothingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [photo, setPhoto] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [category, setCategory] = useState("top")
  const [dominantColor, setDominantColor] = useState<string>("#888888")
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    { id: "top", label: "Top" },
    { id: "bottom", label: "Bottom" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
  ]

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(file)
    setPhoto(imageUrl)

    // Extract dominant color
    try {
      const color = await extractDominantColor(imageUrl)
      setDominantColor(color)
    } catch (error) {
      console.error("Error extracting color:", error)
    }

    setIsProcessing(false)
    setStep(1) // Move to next step after processing
  }

  const handleCameraCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      // Submit the form
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    } else {
      router.push("/closet")
    }
  }

  const handleSubmit = () => {
    // Here you would typically save the data to your backend
    console.log({
      name,
      category,
      dominantColor,
      photo,
    })

    // Navigate back to closet
    router.push("/closet")
  }

  const isNextDisabled = () => {
    if (step === 0) return !photo
    if (step === 1) return !category
    if (step === 2) return !name
    return false
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Add New Item</h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Step indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === step ? "bg-black" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* Step content */}
        <div className="max-w-md mx-auto">
          {/* Step 0: Take Photo */}
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Add a Photo</h2>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />

              {!photo ? (
                <div
                  className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 cursor-pointer"
                  onClick={handleCameraCapture}
                >
                  <Camera size={48} className="text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Tap to take a photo</p>
                  <p className="text-xs text-gray-400 mt-1">or upload from your gallery</p>
                </div>
              ) : (
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src={photo || "/placeholder.svg"} alt="Clothing item" fill className="object-cover" />
                  <button
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
                    onClick={() => setPhoto(null)}
                  >
                    <X size={20} />
                  </button>
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={handleCameraCapture}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
                <Button className="flex-1" disabled={isNextDisabled() || isProcessing} onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 1: Select Category & Color */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Item Details</h2>

              {photo && (
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src={photo || "/placeholder.svg"} alt="Clothing item" fill className="object-cover" />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label className="text-base mb-2 block">Category</Label>
                  <RadioGroup value={category} onValueChange={setCategory} className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <div key={cat.id} className="flex items-center">
                        <RadioGroupItem value={cat.id} id={cat.id} className="peer sr-only" />
                        <Label
                          htmlFor={cat.id}
                          className="px-3 py-2 rounded-full text-sm border peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white cursor-pointer"
                        >
                          {cat.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base mb-2 block">Detected Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border" style={{ backgroundColor: dominantColor }} />
                    <div className="text-sm">{dominantColor}</div>
                    <Palette className="ml-auto text-gray-400" size={20} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={handleBack}>
                  Back
                </Button>
                <Button className="flex-1" disabled={isNextDisabled()} onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Name the Item */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Name Your Item</h2>

              <div className="flex items-center gap-4">
                {photo && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={photo || "/placeholder.svg"} alt="Clothing item" fill className="object-cover" />
                  </div>
                )}

                <div className="flex-1">
                  <div className="w-6 h-6 rounded-full mb-1" style={{ backgroundColor: dominantColor }} />
                  <div className="text-sm text-gray-500">{categories.find((c) => c.id === category)?.label}</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input
                  id="item-name"
                  placeholder="e.g. Favorite Jacket"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={handleBack}>
                  Back
                </Button>
                <Button className="flex-1" disabled={isNextDisabled()} onClick={handleSubmit}>
                  <Check className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
