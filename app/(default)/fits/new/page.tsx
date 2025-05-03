"use client";

import { useEffect, useState } from "react";
import { create } from "./add_fit_check";
import BackgroundRemover from "@/app/components/background_remover";
import mobileCheck from "@/lib/mobile_check";
import FitCheckAnnotator from "@/app/components/ImageAnnotator";
import CircularProgress from "@mui/material/CircularProgress";
import { weatherIcons } from "@/lib/weather_icons";
import FitCheckAnnotator2 from "@/app/components/ImageAnnotator2";

// Define the type for weatherIcons keys
type WeatherIconKey = keyof typeof weatherIcons;

const visualcrossing_apikey = process.env.VSIUALCROSSING_API_KEY ?? "H53XFDC27T25HNKSVS6JQJ6S2";



const NewFitCheck = () => {
    const [image, setImage] = useState<File | null>(null);
    const [note, setNote] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [ocasion, setOcasion] = useState<string | null>(null);
    const [dots, setDots] = useState<{ x: number; y: number; piece_data: any }[]>([]);
    const [editingDot, setEditingDot] = useState<{ index: number; dot: { x: number; y: number } } | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingWeatherData, setIsFetchingWeatherData] = useState(false);

    const [weatherData, setWeatherData] = useState<any>(null);
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("Fetching location...");

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            console.error('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newLocation = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };
                setLocation(newLocation);

                console.log("Location:", newLocation);

                // fetch(
                //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${newLocation.lat},${newLocation.lon}?unitGroup=metric&key=${visualcrossing_apikey}&contentType=json`
                // )

                fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${newLocation.lat},${newLocation.lon}/today?unitGroup=metric&include=days&key=${visualcrossing_apikey}&contentType=json`, {
                    "method": "GET",
                    "headers": {
                    }
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Failed to fetch weather data");
                        return response.json();
                    })
                    .then((data) => {
                        const partial_data = {
                            "tempmax": data.days[0].tempmax,
                            "tempmin": data.days[0].tempmin,
                            "feelslikemax": data.days[0].feelslikemax,
                            "feelslikemin": data.days[0].feelslikemin,
                            "condition": data.days[0].condition,
                            "note": data.days[0].note,
                            "icon": data.days[0].icon,
                        }
                        setWeatherData(partial_data);
                    }).catch(err => {
                        console.error(err);
                        setError(`Weather API Error: ${err}`);

                    });
            },
            (err) => {
                setError(`Error: ${err.message}`);
                console.log("Error getting location:", err.message);
            }
        );
    }, []);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            alert("Please provide an outfit name and an image.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        try {
            setIsSubmitting(true);

            await create({ "image": image, "note": note, "date": date, weather: weatherData, "ocasion": ocasion });
        } catch (error) {
            console.error("Error uploading outfit:", error);
            alert("Failed to add outfit.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container grid grid-cols-2 gap-4">

            <div>
                <a href="../">Repeating a fit?</a>
                <h1>Add a New Outfit</h1>
                {isFetchingWeatherData ? (
                    <p>
                        <span>Fetching weather data...</span>
                        <span style={{ marginLeft: "10px" }}>
                            <CircularProgress size={20} />
                        </span>
                    </p>
                ) : weatherData ? (
                    <div>
                        <img src={weatherIcons[weatherData.icon as WeatherIconKey] || ""} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
                        <p>Weather: {weatherData.condition}</p>
                        <p>{weatherData.icon}</p>
                        <p>Temperature: {weatherData.tempmax}°C / {weatherData.tempmin}°C</p>
                        <p>Feels Like: {weatherData.feelslikemax}°C / {weatherData.feelslikemin}°C</p>
                    </div>
                ) : (
                    <p>"Weather data not fetched yet"</p>
                )}
                                <ul>
                    {dots.map((dot, index) => (
                    <li key={index}>
                        <div className="mt-2">
                        <label htmlFor={`piece-name-${index}`}>Piece Name:</label>
                        <input
                            type="text"
                            id={`piece-name-${index}`}
                            value={dot.piece_data?.name || ""}
                            onChange={(e) => {
                            const updatedDots = [...dots];
                            updatedDots[index].piece_data = {
                                ...updatedDots[index].piece_data,
                                name: e.target.value,
                            };
                            setDots(updatedDots);
                            }}
                            className="ml-2 border rounded px-2 py-1"
                        />
                        </div>
                        <div className="mt-2">
                        <label htmlFor={`piece-type-${index}`}>Piece Type:</label>
                        <input
                            type="text"
                            id={`piece-type-${index}`}
                            value={dot.piece_data?.type || ""}
                            onChange={(e) => {
                            const updatedDots = [...dots];
                            updatedDots[index].piece_data = {
                                ...updatedDots[index].piece_data,
                                type: e.target.value,
                            };
                            setDots(updatedDots);
                            }}
                            className="ml-2 border rounded px-2 py-1"
                        />
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="note">Note:</label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="occasion">Occasion:</label>
                        <select
                            id="occasion"
                            required
                            onChange={(e) => setOcasion(e.target.value)}
                        >
                            <option value="">Select an occasion</option>
                            <option value="work">Work</option>
                            <option value="just_staying_home">Just Staying Home</option>
                            <option value="night_out">Night Out</option>
                            <option value="formal_event">Formal Event</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date?.toISOString().split("T")[0]}
                            onChange={(e) => setDate(new Date(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Upload Picture:</label>
                        <input type="file" id="image" accept="image/*" capture="user" onChange={handleImageChange} required />
                        <div>
                            {mobileCheck() && (
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("image")?.click()}
                                    style={{ marginBottom: "10px" }}
                                >
                                    Choose from Gallery
                                </button>
                            )}
                            {image && (
                                <div className="w-[50%] h-10">
                                    <FitCheckAnnotator2 imgSrc={URL.createObjectURL(image)} dots={dots} setDots={setDots} editingDot={editingDot} setEditingDot={setEditingDot} />
                                </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                        SEND
                        {isSubmitting ? "Submitting..." : "Add Outfit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewFitCheck;