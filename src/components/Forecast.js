import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: 5,
  margin: 5,
  textAlign: 'center',
  height: 190,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledCardContent = styled(CardContent)({
  justifyContent: 'space-around',
  height: '100%',
});

const LargeAvatar = styled(Avatar)({
  width: 40,
  height: 40,
  margin: '5px auto',
});

const TempTypography = styled(Typography)({
  margin: '5px 0',
});

function Forecast({ forecastData }) {
  if (!forecastData) return <Typography>No data available.</Typography>;

  return (
    <Grid container spacing={1} justifyContent="center">
      {forecastData.daily.slice(0, 7).map((day, index) => (
        <Grid item key={index} xs={6} sm={4} md={3} lg={1}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="subtitle2" align="center">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Typography>
              <LargeAvatar
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
              <TempTypography variant="body2" align="center">
                {(day.temp.day - 273.15).toFixed(1)}°C
              </TempTypography>
              <Typography variant="caption" align="center">
                {day.weather[0].description}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default Forecast;
