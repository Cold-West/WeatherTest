import { useEffect, useRef, useState } from "react";
import WeatherBox from "./components/WeatherBox";

const App = () => {
  const [weatherBoxes, setWeatherBoxes] = useState([
    {latitude: 12, longitude: 12, id:1},
  ])

  const removeWeatherBox = (weather: {id:number;}) =>{
    setWeatherBoxes(weatherBoxes.filter(w => w.id !== weather.id))
  }
  const addWeatherBox = () =>{
    const newWeatherBox ={
      latitude: 12,
      longitude: 12,
      id: Date.now(),
    }
    setWeatherBoxes([...weatherBoxes, newWeatherBox])
  }

  return (
    <>
      <h1>Погода</h1>
      <button className="addWeatherBoxButton" onClick={addWeatherBox}>+</button>
        {weatherBoxes.map(weather =>
          <WeatherBox remove={removeWeatherBox} weather={weather} key={weather.id}/>
        )}
    </>
  )
};

export default App;
