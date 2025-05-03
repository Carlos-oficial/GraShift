'use client';

import { useRef, useState } from 'react';
import MultiStepForm from './MultistepForm';
import { CardContent } from '@mui/material';
import { Card } from './ui/card';
import { X } from 'lucide-react';
import AnotationEditCard from './AnotationEditCard';

interface ImageAnnotatorProps {
    imgSrc: string;
}
export default function FitCheckAnnotator({
    imgSrc,
    dots,
    setDots,
    editingDot,
    setEditingDot
}: ImageAnnotatorProps & {
    dots: { x: number; y: number; piece_data: any }[];
    setDots: React.Dispatch<
        React.SetStateAction<{ x: number; y: number; piece_data: any }[]>
    >;
    editingDot: { index: number; dot: { x: number; y: number } } | null;
    setEditingDot: React.Dispatch<
        React.SetStateAction<{ index: number; dot: { x: number; y: number } } | null>
    >;

}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const updateDotData = (index: number, data: any) => {
        setDots((prevDots) =>
            prevDots.map((dot, i) => (i === index ? { ...dot, piece_data: data } : dot))
        );
    };

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    const handleFormCompletion = (category: string, itemId: string) => {
        setSelectedCategory(category);
        setSelectedItemId(itemId);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Prevent adding a dot too close to an existing one
        const isTooClose = dots.some(
            (dot) => Math.abs(dot.x - x) < 0.02 && Math.abs(dot.y - y) < 0.02
        );
        if (isTooClose) {
            console.log('Cannot add a dot too close to an existing one.');
            return;
        }

        setDots([...dots, { x, y, piece_data: {} }]);
        setEditingDot({ index: dots.length, dot: { x, y } });
    };

    

    return (

        <div
            ref={containerRef}
            onClick={handleClick}
            className="absolute top-0 left-0 w-full sm:h-full h-screen flex items-center justify-center overscroll-y-none"
        >
            <img
                src={imgSrc}
                alt="annotatable"
                className="object-cover  w-full h-full"
            />
            {dots.map((dot, i) => (
                <div key={i}>
                    {
                        editingDot?.index === i && (dot?.piece_data.category == undefined && (
                            <div
                              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingDot(null)}} // Click outside closes the form
                            >
                              <div
                                className="relative rounded-xl max-w-4xl w-full p-8 z-60"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                              >
                                <MultiStepForm
                                    initialStep={1}
                                    initialData={dot.piece_data}
                                    onComplete={({ category, itemId }) => {
                                        updateDotData(i, { category, id: itemId });
                                        setEditingDot(null);
                                    }}
                                    onClose={() => setEditingDot(null)}
                                />
                              </div>
                            </div>
                          ) || (
                            <div
                              className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation()
                                setEditingDot(null)}} // Click outside closes the form
                            >
                              <div
                                className="relative rounded-xl max-w-4xl w-full p-8 z-60"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                              >
                                <AnotationEditCard
                                  onClose={() => setEditingDot(null)}
                                  onEdit={() => {
                                      <MultiStepForm
                                        initialStep={2}
                                        initialData={dot.piece_data}
                                        onComplete={({ category, itemId }) => {
                                          updateDotData(i, { category, id: itemId });
                                          setEditingDot(null);
                                        }}
                                        onClose={() => setEditingDot(null)}
                                      />;
                                  }}
                                />
                              </div>
                            </div>
                            
                          ))
                    }
                    <div
                        className={`absolute w-5 h-5 rounded-full cursor-pointer ${editingDot?.index === i
                            ? 'bg-white'
                            : 'bg-gray-300/80 '
                            }`}
                        style={{
                            left: `${dot.x * 100}%`,
                            top: `${dot.y * 100}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            const rect = containerRef.current!.getBoundingClientRect();
                            const x = (e.clientX - rect.left) / rect.width;
                            const y = (e.clientY - rect.top) / rect.height;

                            const clickedDot = dots.find(
                                (dot) => Math.abs(dot.x - x) < 0.02 && Math.abs(dot.y - y) < 0.02
                            );

                            if (clickedDot) {
                                const clickedDotIndex = dots.findIndex(
                                    (dot) => Math.abs(dot.x - x) < 0.02 && Math.abs(dot.y - y) < 0.02
                                );
                                console.log('Clicked dot:', clickedDot, 'Index:', clickedDotIndex);

                                setEditingDot({ index: clickedDotIndex, dot: clickedDot });
                            }

                            setDots((prevDots) =>
                                prevDots.map((d, idx) => (idx === i ? { x, y, piece_data: d.piece_data } : d))
                            );

                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                const rect = containerRef.current!.getBoundingClientRect();
                                const x = (moveEvent.clientX - rect.left) / rect.width;
                                const y = (moveEvent.clientY - rect.top) / rect.height;
                                setDots((prevDots) =>
                                    prevDots.map((d, idx) => (idx === i ? { x, y, piece_data: d.piece_data } : d))
                                );
                            };

                            const handleMouseUp = () => {
                                window.removeEventListener('mousemove', handleMouseMove);
                                window.removeEventListener('mouseup', handleMouseUp);
                            };

                            window.addEventListener('mousemove', handleMouseMove);
                            window.addEventListener('mouseup', handleMouseUp);
                        }}
                    />
                </div>

            ))
            }
        </div >

    );
}

/*
<div className="mt-4 p-2 border rounded">
<h3>Selected Dot</h3>
<p>
Index: {editingDot.index + 1}, x: {editingDot.dot.x.toFixed(2)}, y: {editingDot.dot.y.toFixed(2)}
</p>
                <button
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    onClick={(event) => {
                        event.preventDefault();
                        setDots((prevDots) =>
                            prevDots.filter((_, idx) => idx !== editingDot.index)
                        );
                        setEditingDot((prev) => {
                            if (dots.length === 1) return null; // No dots left
                            const newIndex = Math.max(0, editingDot.index - 1);
                            return { index: newIndex, dot: dots[newIndex] };
                        });

                        const handleKeyDown = (event: KeyboardEvent) => {
                            if (event.key === 'Delete' || event.key === 'Backspace') {
                                setDots((prevDots) =>
                                    prevDots.filter((_, idx) => idx !== editingDot.index)
                                );
                                setEditingDot((prev) => {
                                    if (dots.length === 1) return null; // No dots left
                                    const newIndex = Math.max(0, editingDot.index - 1);
                                    return { index: newIndex, dot: dots[newIndex] };
                                });
                            }
                        };

                        window.addEventListener('keydown', handleKeyDown);

                        return () => {
                            window.removeEventListener('keydown', handleKeyDown);
                        };
                    }}
                >
                    Remove
                </button>
            </div>
*/