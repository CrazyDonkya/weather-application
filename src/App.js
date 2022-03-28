import React, { useState } from "react";
import './index.css'

const api = {
  key: process.env.REACT_APP_API_KEY,
  URL: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const searchFunc = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.URL}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result)
        setQuery('')
        console.log(result)
      })
    }
  }

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
        <div className="search">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchFunc}
          />
        </div>
        {(weather.main !== undefined) ? (
          <div>
            <div className="location-info">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-info">
              <div className="temperature">{Math.round(weather.main.temp)}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;