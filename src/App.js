import './App.css';
import React, { useState, useContext, useEffect, useRef } from 'react'


function App() {
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('')

  useEffect(() => {
    
  

  // getWeatherAPI()

  /*
  const timer = setInterval(() => {
    getWeatherAPI()
    console.log('5 Seconds!')
  }, 5000);
  
  return () => clearInterval(timer) 
  */
  }, []);

  async function getWeatherAPI() {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fa717a930bec03ce7d0d693a9cd2c54b`)
      const weatherData = await response.json()
      setWeather(weatherData)
      console.log(weather)
    } catch (error) {
      console.log(error);
  }
}



  const input = (e) => {
    if(e.key === "Enter") {
      setLocation(e.target.value)
      getWeatherAPI()
    } else {
      console.log(e.target.value)
    }
  }
  

  return (
    <div className="App">
      <h1> Hello World </h1> <br />
      <input 
        value={location}
        placeholder={"search Location"}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={input}
      />


    </div>
  );
}

export default App;
