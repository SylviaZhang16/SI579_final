import React, { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import SearchBar from './components/SearchBar';
import CityWeather from './components/CityWeather';
import { CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const App = () => {
    const API_KEY = "90f56af41892db057bb6910fb445645d"; 

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [showForecast, setShowForecast] = useState(false);
    const [likedCities, setLikedCities] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
    const [currentLocationForecast, setCurrentLocationForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showCurrentLocationForecast, setShowCurrentLocationForecast] = useState(false);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [isCurrentLocationAccordionExpanded, setIsCurrentLocationAccordionExpanded] = useState(false);
    const [isSavedCitiesAccordionExpanded, setIsSavedCitiesAccordionExpanded] = useState(false);


    const handleCurrentLocationAccordionChange = (event, isExpanded) => {
        setIsCurrentLocationAccordionExpanded(isExpanded);
    };

    const handleSavedCitiesAccordionChange = (event, isExpanded) => {
        setIsSavedCitiesAccordionExpanded(isExpanded);
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    const savedCitiesSectionStyle = {
        backgroundColor: '#f0f0f0', 
        padding: '20px',
        borderRadius: '8px',
        paddingBottom: '75px'
    };

    const savedCitiesStyle = {
    };

    const cityBoxStyle = {
        margin: '20px',
        backgroundColor: '#fff',
        padding: '10px', // Optional, for internal spacing within the city box
        borderRadius: '4px' // Optional, for rounded corners
    };

    const clearButtonStyle = {
        backgroundColor: '#ff4d4d', // Reddish background
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '20px 0',
        float: 'right',
    };

    const currentLocationStyle = {
        padding: '20px',
        margin: '20px 0',
        borderTop: '1px solid #ccc',
    };

    const buttonStyle = {
        backgroundColor: '#4caf50', // Example green color
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px 0',
    };

    const accordionDetailsStyle = {
        display: 'block', 
    };

    const accordionTitleStyle = {
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        color: '#333', 
    };

    const mainContainerStyle = {
        padding: '20px', 
        paddingLeft: '40px',
        paddingRight: '40px',
    };

    const headerStyle = {
        textAlign: 'center', 
        padding: '20px 0', 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        color: '#333', 
        backgroundColor: '#f8f8f8', 
        marginBottom: '20px',
    };


    useEffect(() => {
        const savedCities = localStorage.getItem('likedCities');
        console.log('Loaded from localStorage:', savedCities);
        if (savedCities) {
            setLikedCities(JSON.parse(savedCities));
            console.log('Parsed and set likedCities:', savedCities); 
        }
        setIsInitialLoad(false); // Set flag to false after initial load
    }, []);

    useEffect(() => {
        // Only save to local storage if it's not the initial load
        if (!isInitialLoad) {
            localStorage.setItem('likedCities', JSON.stringify(likedCities));
            console.log('Saved to localStorage:', likedCities); 
        }
    }, [likedCities, isInitialLoad]);

    const handleSearch = async (city) => {
        setShowForecast(false);
        setErrorMessage(null); // Reset error message on new search

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('City not found'); // Throws an error if response is not ok
            }
            const data = await response.json();

            setWeatherData(data);
            if (data.coord) {
                fetchForecastData(data.coord.lat, data.coord.lon);
            }
        } catch (error) {
            setWeatherData(null);
            setForecastData(null);
            setErrorMessage(error.message);
            setIsErrorModalOpen(true); 
        }
    };

    const fetchForecastData = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Unable to fetch forecast data');
            }
            const data = await response.json();
            setForecastData(data);
        } catch (error) {
            setForecastData(null);
            setErrorMessage(error.message);
        }
    };

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };


    const clearSavedCities = () => {
        setLikedCities([]);
        localStorage.removeItem('likedCities');
    };

    const isCityLiked = () => {
        return weatherData && likedCities.some(city => city.id === weatherData.id);
    };

    const toggleLikeCity = () => {
        if (!weatherData) return;

        if (isCityLiked()) {
            setLikedCities(likedCities.filter(city => city.id !== weatherData.id));
        } else {
            setLikedCities([...likedCities, weatherData]);
        }
    };

    const removeFromLikedCities = (cityId) => {
        setLikedCities(likedCities.filter(city => city.id !== cityId));
    };

    const handleLocationSearch = () => {
        setIsLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                await fetchWeatherByCoords(latitude, longitude);
            }, (error) => {
                console.error("Error Code = " + error.code + " - " + error.message);
                setErrorMessage("Unable to retrieve your location.");
            });
        } else {
            setErrorMessage("Geolocation is not supported by this browser.");
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Weather data not found for your location');
            }
            const weatherData = await response.json();
            setCurrentLocationWeather(weatherData);

            const forecastResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`);
            if (!forecastResponse.ok) {
                throw new Error('Unable to fetch forecast data');
            }
            const forecastData = await forecastResponse.json();
            setCurrentLocationForecast(forecastData);
        } catch (error) {
            setCurrentLocationWeather(null);
            setCurrentLocationForecast(null);
            setErrorMessage(error.message);
        }
        setIsLoading(false);
    };


    const isCurrentLocationLiked = () => {
        return currentLocationWeather && likedCities.some(city => city.id === currentLocationWeather.id);
    };
    
    const toggleLikeCurrentLocation = () => {
        if (currentLocationWeather) {
            if (isCurrentLocationLiked()) {
                setLikedCities(likedCities.filter(city => city.id !== currentLocationWeather.id));
            } else {
                setLikedCities([...likedCities, currentLocationWeather]);
            }
        }
    };

    const toggleCurrentLocationForecast = () => {
        setShowCurrentLocationForecast(prevState => !prevState);
    };

    

    return (
        <div style={mainContainerStyle}>
            <div style={headerStyle}>
                <div>My Weather App</div>
            </div>
                 <SearchBar onSearch={handleSearch} />
                
                 {weatherData && (
                    <WeatherDisplay 
                        weatherData={weatherData} 
                        onForecastToggle={toggleForecast} 
                        isLiked={isCityLiked()} 
                        onLikeToggle={toggleLikeCity}
                    />
                )}
    
                {showForecast && <Forecast forecastData={forecastData} />}
    
                <Accordion expanded={isCurrentLocationAccordionExpanded} onChange={handleCurrentLocationAccordionChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={accordionTitleStyle}>Current Location Weather</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={accordionDetailsStyle}>
                    <div style={currentLocationStyle}>
                        <p>Click the button to get your current location and search the weather forecast for this city.</p>
                        <Button 
                            onClick={handleLocationSearch} 
                            style={buttonStyle}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Get Weather at My Location'}
                        </Button>
                        {currentLocationWeather && (
                            <>
                                <WeatherDisplay 
                                    weatherData={currentLocationWeather} 
                                    onForecastToggle={toggleCurrentLocationForecast} 
                                    isLiked={isCurrentLocationLiked()}
                                    onLikeToggle={toggleLikeCurrentLocation}
                                />
                                {showCurrentLocationForecast && (
                                    <Forecast forecastData={currentLocationForecast} />
                                )}
                            </>
                        )}
                        </div>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={isSavedCitiesAccordionExpanded} onChange={handleSavedCitiesAccordionChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography style={accordionTitleStyle}>Saved Cities</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={accordionDetailsStyle}>
                    <div style={savedCitiesSectionStyle}>
                    {likedCities && likedCities.length > 0 ? (
                        <div style={savedCitiesStyle}>
                            {likedCities.map(city => (
                                <div key={city.id} style={cityBoxStyle}>
                                    <CityWeather 
                                        cityData={city} 
                                        API_KEY={API_KEY} 
                                        isLiked={true}
                                        onUnlikeCity={removeFromLikedCities}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : <p>No saved cities.</p>}
                     {likedCities.length > 0 && (
                    <button 
                        onClick={clearSavedCities}
                        style={clearButtonStyle}>
                        Clear Saved Cities
                    </button>
                )}
                </div>
                    </AccordionDetails>
                </Accordion>
                          
                {/* <div style={currentLocationStyle}>
                    <h2>Current Location Weather</h2>
                    <Button 
                        onClick={handleLocationSearch} 
                        style={buttonStyle}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Get Weather at My Location'}
                    </Button>
                    {currentLocationWeather && (
                        <>
                            <WeatherDisplay 
                                weatherData={currentLocationWeather} 
                                onForecastToggle={toggleCurrentLocationForecast} 
                                isLiked={isCurrentLocationLiked()}
                                onLikeToggle={toggleLikeCurrentLocation}
                            />
                            {showCurrentLocationForecast && (
                                <Forecast forecastData={currentLocationForecast} />
                            )}
                        </>
                    )}
                </div>
    
                <div style={savedCitiesSectionStyle}>
                    <h2>Saved Cities</h2>
                    {likedCities && likedCities.length > 0 ? (
                        <div style={savedCitiesStyle}>
                            {likedCities.map(city => (
                                <div key={city.id} style={cityBoxStyle}>
                                    <CityWeather 
                                        cityData={city} 
                                        API_KEY={API_KEY} 
                                        isLiked={true}
                                        onUnlikeCity={removeFromLikedCities}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : <p>No saved cities.</p>}
                     {likedCities.length > 0 && (
                    <button 
                        onClick={clearSavedCities}
                        style={clearButtonStyle}>
                        Clear Saved Cities
                    </button>
                )}
                </div> */}


                <Dialog
                    open={isErrorModalOpen}
                    onClose={handleCloseErrorModal}
                    aria-labelledby="error-dialog-title"
                    aria-describedby="error-dialog-description"
                >
                    <DialogTitle id="error-dialog-title">{"Search Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="error-dialog-description">
                            {errorMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseErrorModal} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        );

};

export default App;


