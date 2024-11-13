import React from 'react'
import rain from '/icons/rain.png'
import snow from '/icons/snow.png'
import cloud from '/icons/cloudy.png'
import sunny from '/icons/sunny.png'
import thunder from '/icons/thunder.png'
import './style.css'

function WeatherIcons({value}) {  
    const weatherCondition = value ? value.toLowerCase() : '';
        const getPrimaryCondition = (condition) => {
            if (condition.includes('rain')) return 'rain';
            if (condition.includes('snow')) return 'snow';
            if (condition.includes('cloud')) return 'cloud';
            if (condition.includes('sun') || condition.includes('clear')) return 'sunny';
            if (condition.includes('thunder')) return 'thunder';
            return ''; 
        };
        const primaryCondition = getPrimaryCondition(weatherCondition);
        const DisplayIcon = ()=>{
            switch (primaryCondition) {
                case "rain":
                    return <img src={rain} alt="Rainy" />;
                case "snow":
                    return <img src={snow} alt="Snowy" />;
                case "cloud":
                    return <img src={cloud} alt="Cloudy" />;
                case "sunny":
                    return <img src={sunny} alt="Sunny" />;
                case "thunder":
                    return <img src={thunder} alt="Thunderstorm" />;
                default:
                    return <p> </p>;
        }}
  return (
    <div >
        <DisplayIcon />
    </div>
  )
}


export default WeatherIcons