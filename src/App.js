import './App.css';
import React, { useState, useContext, useEffect, useRef } from 'react'


function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("")
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")


  async function getWeatherAPI(value) {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=fa717a930bec03ce7d0d693a9cd2c54b`, {
        mode: 'cors',
      })
      const weatherData = await response.json()
      setError(false)
      setWeather(weatherData)
      
    } catch (error) {
      let err = await (error)
      alert(error)

      setError(true)
      setErrorMsg(error.toString())

  }
}

// useEffect for the initial fetch a default weather when browser is first launched.
useEffect(() => {
  getWeatherAPI("Seattle")
}, [])

  const input = async(e) => {
    if(e.key === "Enter") {
      setLocation(e.target.value)
      await getWeatherAPI(location)
      await setLocation("")
    } else {
      console.log(e.target.value)
    }
  }


  // To do: add C to F toggler
  // C: &#8451;
  // F: &#8457;
  const renderWeather = () => {
    const tempFahConversion = (temp) => {
      return Math.floor((parseInt(temp) - 273.15) * 9/5 + 32)
    }

    if(errorMsg === "TypeError: Cannot read property '0' of undefined") {
      return <h1> {errorMsg} </h1>
    } else if(!error) {
      return (
        <>
          <p> {weather.weather[0].description.slice(0, 1).toUpperCase() + weather.weather[0].description.slice(1)} </p>
          <h1>{weather.name}, {weather.sys.country}</h1>
          <h4> Current Temp: {tempFahConversion(weather.main.temp)} &#8457;</h4>
          <p> 
            <span> Feels Like: {tempFahConversion(weather.main.feels_like)} &#8457;</span>
            <span> | </span>
            <span> Sunrise: {tempFahConversion(weather.main.temp_max)} &#8457;</span>
            <span> | </span>
            <span> Sunset: {tempFahConversion(weather.main.temp_max)} &#8457;</span>
          </p>
        </>
      ) 
    }

    
  }

  return (
    <div className="App">
      <h1> Hello World </h1> <br />
      <input 
        value={location}
        placeholder={"Search Location"}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={input}
      />

      <br />

      {weather !== null && renderWeather()}

    </div>
  );
}

export default App;
