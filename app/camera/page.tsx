'use client'

import { useState } from "react";
import FitCheckAnnotator from "../components/ImageAnnotator";
import SegmentationTool from "../components/segmentation";

export default function Camera() {
  const [image, setImage] = useState<string | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [dots, setDots] = useState<{ x: number; y: number; piece_data: any }[]>([]);

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" accept="image/*" capture="user" onChange={handleCapture} />
      {image && 
      <>
        <FitCheckAnnotator imgSrc={image} dots={dots} setDots={setDots}/> 
      </>
      }
      <button>Upload</button>

      <SegmentationTool/>
    </div>
  );
}
{/* <img src={image} alt="Captured" style={{ marginTop: "10px", maxWidth: "100%" }} /> */}