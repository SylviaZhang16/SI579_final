import React, { useState } from 'react';
import WeatherDisplay from './WeatherDisplay';
import Forecast from './Forecast';
import { Button, CircularProgress } from '@material-ui/core';

const CityWeather = ({ cityData, API_KEY, isLiked, onToggleForecast, onUnlikeCity }) => {
    const [showForecast, setShowForecast] = useState(false);
    const [forecastData, setForecastData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleForecast = async () => {
        if (!showForecast && !forecastData) {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${cityData.coord.lat}&lon=${cityData.coord.lon}&exclude=hourly&appid=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Unable to fetch forecast data');
                }
                const data = await response.json();
                setForecastData(data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        setShowForecast(!showForecast);
    };

    const handleUnlike = () => {
        if (onUnlikeCity) {
            onUnlikeCity(cityData.id);
        }
    };

    return (
        <div>
            <WeatherDisplay 
                weatherData={cityData}
                onForecastToggle={toggleForecast}
                isLiked={isLiked}
                onLikeToggle={isLiked ? handleUnlike : null}
            />
            {isLoading && <CircularProgress />}
            {showForecast && forecastData && <Forecast forecastData={forecastData} />}
        </div>
    );
};

export default CityWeather;