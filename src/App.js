import React, { useState, useEffect } from "react";
import './index.css'
import { SearchPlaces } from "./places/SearchPlaces";

const weatherApi = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  URL: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [city, setCity] = useState()
  const [weather, setWeather] = useState({})

  useEffect(() => {
    console.log(`${weatherApi.URL}weather?q=${city}&units=metric&APPID=${weatherApi.key}`)
    fetch(`${weatherApi.URL}weather?q=${city}&units=metric&APPID=${weatherApi.key}`)
    .then(response => response.json())
    .then(result => {
      setWeather(result)
      console.log(result)
    })
  },[city])

  const dateBuilder = (d) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main>
        <SearchPlaces
          getCity={(city) => setCity(city)} 
        />
        {(weather.main !== undefined) ? (
          <div>
            <div className="location-info">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-info">
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}



export default App;