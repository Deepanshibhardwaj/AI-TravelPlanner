// src/utils/fetchWeatherData.js

export const fetchWeatherData = async (city) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Fetch API key from .env
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null; // Return null if an error occurs
    }
};
