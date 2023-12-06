import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  border: 'none',
  boxShadow: 'none',
});

const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

const WeatherDisplay = ({ weatherData, onForecastToggle, isLiked, onLikeToggle }) => {
  if (!weatherData) return <p>No data available.</p>;

  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h5" component="div">
          {weatherData.name}, {weatherData.sys.country}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {weatherData.weather[0].description}
        </Typography>
        <Avatar
          src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
          style={{ width: 50, height: 50, margin: '10px auto' }}
        />
        <Typography variant="body1">
          Temp: {(weatherData.main.temp - 273.15).toFixed(2)} °C
        </Typography>
        <IconButton onClick={onLikeToggle}>
          {isLiked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button onClick={onForecastToggle} color="primary" variant="outlined" style={{ marginTop: '10px' }}>
          View Forecast
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default WeatherDisplay;
