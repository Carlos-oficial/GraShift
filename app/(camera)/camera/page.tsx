'use client'

import { useState } from "react";
import FitCheckAnnotator from "../../components/ImageAnnotator";

import Link from "next/link";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button } from "@/app/components/ui/button";

export default function Camera() {
  const [image, setImage] = useState<string | null>(null);
  const [editingDot, setEditingDot] = useState<{ index: number; dot: { x: number; y: number } } | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
        document.documentElement.style.setProperty('--image-max-width', '100vw');
      };
    }
  };



  type PieceData = {
    category?: string|undefined;
    id?: string|undefined;
  };

  const handleDotUpdate = (index: number, updatedDot: { x: number; y: number; piece_data?: PieceData }) => {
    setDots((prevDots) => {
      const newDots = [...prevDots];
      newDots[index] = { ...newDots[index], ...updatedDot };
      return newDots;
    });
  };

  const [dots, setDots] = useState<{ x: number; y: number; piece_data: PieceData }[]>([]);

  return (<>
    <nav className="sticky top-0 left-0 w-full z-50 bg-gradient-to-b from-black/30 to-transparent text-white">
      <div className="grid grid-cols-3 md:grid-cols-8 gap-5 p-4">
      <div className="hidden md:block md:col-span-2" />

      <div className="col-span-3 md:col-span-4 flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center  hover:opacity-80">
        <CloseOutlinedIcon />
        </Link>

        {image && (
        <label htmlFor="fileInput" className="font-weight-xl cursor-pointer px-4 py-2 rounded hover:opacity-80">
          Swap photo
        </label>
        )}
      </div>

      {/* Desktop: right empty cols 7–8 */}
      <div className="hidden md:block md:col-span-2" />
      </div>
    </nav>
    <div className="flex flex-col items-center justify-center h-full">
      <input
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleCapture}
        style={{ display: "none" }}
        id="fileInput"
      />
      <div className="flex items-center justify-center">

        {!image && <label htmlFor="fileInput" className="cursor-pointer bg-black text-white px-4 py-2 rounded">
          Choose Image
        </label>
        }
      </div>
      {image &&
        <div>
          <FitCheckAnnotator imgSrc={image} dots={dots} setDots={setDots} editingDot={editingDot} setEditingDot={setEditingDot} />
        </div>
      }
    </div>
  </>
  );
}
{/* <img src={image} alt="Captured" style={{ marginTop: "10px", maxWidth: "100%" }} /> */ }


