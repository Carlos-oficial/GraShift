'use client';

import { useRef, useState } from 'react';

interface ImageAnnotatorProps {
    imgSrc: string;
}
export default function FitCheckAnnotator({
    imgSrc,
    dots,
    setDots,
}: ImageAnnotatorProps & {
    dots: { x: number; y: number; piece_data: any }[];
    setDots: React.Dispatch<
        React.SetStateAction<{ x: number; y: number; piece_data: any }[]>
    >;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [editingDot, setEditingDot] = useState<{ index: number; dot: { x: number; y: number } } | null>(null);

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
        <div>
            <div
                ref={containerRef}
                onClick={handleClick}
                className="relative w-[500px]  border"
            >
                <img
                    src={imgSrc}
                    alt="annotatable"
                    className="w-full h-full object-contain"
                />
                {dots.map((dot, i) => (
                    <div
                        key={i}
                        className={`absolute w-5 h-5 rounded-full cursor-pointer ${editingDot?.index === i
                                ? 'bg-red-500 bg-opacity-50'
                                : 'bg-blue-300 bg-opacity-10'
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
                                prevDots.map((d, idx) => (idx === i ? { x, y, piece_data: {} } : d))
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
                ))}
            </div>
            {editingDot && (
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
            )}
            <ul className='text-blue-500'>
                {dots
                    .map((dot, index) => (
                        index !== editingDot?.index &&

                        <li key={index}>
                            <div
                                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                                onClick={(event) => {event.preventDefault(); setEditingDot({ index, dot })}}>
                                Dot {index + 1}: x = {dot.x.toFixed(2)}, y = {dot.y.toFixed(2)}
                            </div>

                        </li>
                    ))}
            </ul>
        </div>
    );
}
