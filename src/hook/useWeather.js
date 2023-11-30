import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '90f56af41892db057bb6910fb445645d';

function useWeather(city) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then(response => {
          setWeatherData(response.data);
        });
    }
  }, [city]);

  return weatherData;
}

export default useWeather;