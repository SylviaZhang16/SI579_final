export const sampleWeatherData = {
    lat: 33.44,
    lon: -94.04,
    current: {
      dt: 1684929490,
      temp: 292.55,
      humidity: 89,
      weather: [{ description: "broken clouds" }],
      wind_speed: 3.13
    },
    "daily":[
        {
           "dt":1684951200,
           "sunrise":1684926645,
           "sunset":1684977332,
           "moonrise":1684941060,
           "moonset":1684905480,
           "moon_phase":0.16,
           "summary":"Expect a day of partly cloudy with rain",
           "temp":{
              "day":299.03,
              "min":290.69,
              "max":300.35,
              "night":291.45,
              "eve":297.51,
              "morn":292.55
           },
           "feels_like":{
              "day":299.21,
              "night":291.37,
              "eve":297.86,
              "morn":292.87
           },
           "pressure":1016,
           "humidity":59,
           "dew_point":290.48,
           "wind_speed":3.98,
           "wind_deg":76,
           "wind_gust":8.92,
           "weather":[
              {
                 "id":500,
                 "main":"Rain",
                 "description":"light rain",
                 "icon":"10d"
              }
           ],
           "clouds":92,
           "pop":0.47,
           "rain":0.15,
           "uvi":9.23
        },
    ]
  };
 