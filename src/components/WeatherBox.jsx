import React from 'react';
import '../styles/appStyles.css';
import { useEffect, useState } from "react";
const cache = new Map();

const WeatherBox = (props) => {

    const [latitude, setLatitude] = useState(`${props.weather.latitude}`);
    const [longitude, setLongitude] = useState(`${props.weather.longitude}`);
    const [text, setText] = useState("Введите координаты");
    const [weather, setWeather] = useState("");

    const deleteWeather = () => {props.remove(props.weather)}

    const checkWeath = async () => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
            
        if (cache.has(url) && (Date.now() > cache.get(url).time + 60000)){
          cache.delete(url);
        }
    
        if (cache.has(url)){
          setWeather(cache.get(url).response);
          setText("Температура:");
        }
        else if (latitude !="" && longitude !=""){
          const response = await fetch(url)
          .then(response =>response.json());
          setWeather(response.current.temperature_2m);
          cache.set(url, {response: response.current.temperature_2m, time: Date.now()});
          setText("Температура:");
        }
        else{
          setText("Введите координаты");
          setWeather("");
        }
        console.log(cache);
      }
    
      useEffect(()=> {
        const timer = setTimeout(()=>{
          checkWeath();
        }, 1000)
        return () => clearTimeout(timer);
      },[latitude, longitude]);

    

    return (
        <div className="box" id={props.weather.id}>
          <form className="boxInner">
            <div className="inputs">
              <input 
                type="text" 
                placeholder="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
              <input
                type="text"
                placeholder="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
            <div className="buttons">
                <button
                    type="button"
                    className="deleteButton" 
                    onClick={deleteWeather}
                >×</button>
            </div>
          </form>
          <p>{text} {weather}</p>
        </div>
    );
};

export default WeatherBox;