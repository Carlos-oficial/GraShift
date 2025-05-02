'use client';

import { useEffect, useRef, useState } from 'react';
import SelfieSegmentation  from '@mediapipe/selfie_segmentation';
// import { drawImageToCanvas } from '@mediapipe/drawing_utils';

export default function BackgroundRemover(image:string) {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const processImage = async (image: HTMLImageElement) => {
    const selfieSegmentation = new SelfieSegmentation.SelfieSegmentation({
      locateFile: (file:string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 1, // 0: landscape, 1: general (selfies)
    });

    selfieSegmentation.onResults((results:any) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      canvas.width = image.width;
      canvas.height = image.height;

      // Apply segmentation mask
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw original image where the mask is visible
      ctx.drawImage(results.segmentationMask!, 0, 0, canvas.width, canvas.height);

      // Composite
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    });

    await selfieSegmentation.initialize();
    selfieSegmentation.send({ image });
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;
    setImageURL(url);

    img.onload = () => {
      processImage(img);
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleChange} />
      {imageURL && (
        <div>
          <h3>Processed Image:</h3>
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
}
