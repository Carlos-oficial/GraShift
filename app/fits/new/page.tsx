"use client";

import { useState } from "react";
import { create } from "./addfit";
import BackgroundRemover from "@/app/components/background_remover";

const NewFit = () => {
    const [image, setImage] = useState<File | null>(null);
    const [outfitName, setOutfitName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !outfitName) {
            alert("Please provide an outfit name and an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("outfitName", outfitName);

        try {
            setIsSubmitting(true);

            await create(formData);
        } catch (error) {
            console.error("Error uploading outfit:", error);
            alert("Failed to add outfit.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Add a New Outfit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="outfitName">Outfit Name:</label>
                    <input
                        type="text"
                        id="outfitName"
                        value={outfitName}
                        onChange={(e) => setOutfitName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Upload Picture:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Add Outfit"}
                </button>
            </form>
        </div>
    );
};

export default NewFit;