import React from 'react';
import { Card, CardContent, Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    padding: 5,
    margin: 5,
    textAlign: 'center',
    height: 190,
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    justifyContent: 'space-around',
    height: '100%',
  },
  large: {
    width: 40,
    height: 40,
    margin: '5px auto',
  },
  temp: {
    margin: '5px 0',
  },
});

function Forecast({ forecastData }) {
  const classes = useStyles();

  if (!forecastData) return <Typography>No data available.</Typography>;

  return (
    <Grid container spacing={1} justify="center">
      {forecastData.daily.slice(0, 7).map((day, index) => (
        <Grid item key={index} xs={6} sm={4} md={3} lg={1}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="subtitle2" align="center">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Typography>
              <Avatar
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className={classes.large}
              />
              <Typography variant="body2" align="center" className={classes.temp}>
                {(day.temp.day - 273.15).toFixed(1)}°C
              </Typography>
              <Typography variant="caption" align="center">
                {day.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Forecast;