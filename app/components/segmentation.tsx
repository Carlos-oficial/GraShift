'use client';

import React, { useRef, useState, useEffect } from 'react';

import * as tf from '@tensorflow/tfjs';
// Removed unused Tensor import
import '@tensorflow/tfjs-backend-webgl';
import * as deeplab from '@tensorflow-models/deeplab';

interface CroppedRegion {
    name: string;
    dataUrl: string;
}

const SegmentationTool = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const [model, setModel] = useState<deeplab.SemanticSegmentation | null>(null);
    const [croppedItems, setCroppedItems] = useState<CroppedRegion[]>([]);

    // Set up TensorFlow backend and load the model
    useEffect(() => {
        const setupAndLoadModel = async () => {
            try {
                await tf.setBackend('webgl');
                await tf.ready();
                console.log('TensorFlow backend initialized');

                const loaded = await deeplab.load({ base: 'pascal', quantizationBytes: 2 });
                console.log('Model loaded:', loaded);
                setModel(loaded);
            } catch (error) {
                console.error('Error setting up TensorFlow backend or loading model:', error);
            }
        };

        setupAndLoadModel();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const runSegmentation = async () => {
        if (!model || !imgRef.current || !canvasRef.current) {
            console.log('Segmentation prerequisites not met:', { model, imgRef: imgRef.current, canvasRef: canvasRef.current });
            return;
        }

        const segmentation = await model.segment(imgRef.current);
        const { width, height } = segmentation;
        const segmentationMap = segmentation.segmentationMap;

        canvasRef.current.width = width;
        canvasRef.current.height = height;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Draw the original image onto the canvas
        ctx.drawImage(imgRef.current, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = y * width + x; // Index in segmentation map
                const labelId = segmentationMap[i];
                if (labelId === 15) { // 15 = person (PASCAL VOC)
                    console.log('Person detected at:', { x, y });
                    const pixelIndex = i * 4; // Index in image data
                    data[pixelIndex + 0] = 255; // Red
                    data[pixelIndex + 1] = 0;   // Green
                    data[pixelIndex + 2] = 0;   // Blue
                    data[pixelIndex + 3] = 150; // Transparency
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);

        console.log('Segmentation map applied to canvas');
    };

    const cropRegion = () => {
        if (!canvasRef.current) {
            console.log('Canvas not available for cropping');
            return;
        }
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) {
            console.log('Canvas context not available for cropping');
            return;
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasRef.current.width;
        tempCanvas.height = canvasRef.current.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) {
            console.log('Temporary canvas context not available');
            return;
        }

        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.putImageData(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height), 0, 0);

        const dataUrl = tempCanvas.toDataURL();
        console.log('Cropped region data URL:', dataUrl);
        setCroppedItems((prev) => [...prev, { name: `Region ${prev.length + 1}`, dataUrl }]);
    };

    return (
        <div className="p-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            {image && (
                <>
                    <img
                        ref={imgRef}
                        src={URL.createObjectURL(image)}
                        alt="Input"
                        className="hidden"
                        onLoad={runSegmentation}
                    />
                    <canvas ref={canvasRef} className="border border-gray-300 w-full h-auto mb-4" />
                    <button
                        onClick={cropRegion}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Crop Highlighted Region
                    </button>
                </>
            )}

            {croppedItems.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-bold mb-2">Cropped Items</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {croppedItems.map((item, i) => (
                            <div key={i} className="border p-2 rounded">
                                <img src={item.dataUrl} alt={item.name} />
                                <p className="text-sm text-center mt-2">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SegmentationTool;
