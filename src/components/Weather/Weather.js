import { useState,useEffect } from "react"
import "./Weather.css"

const Weather = () => {
    const [weatherIcon, setWeatherIcon] = useState("")
    const [weatherStatus, setWeatherStatus] = useState("")
    const [location, setLocation] = useState("Indonesia")
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                });
                const { latitude, longitude } = position.coords
                const locationAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

                const responseLocation = await fetch(locationAPI);
                const dataLocation = await responseLocation.json();
                setLocation(dataLocation.address.city)
            } catch (error) {
                console.log("Error while fething data",error)

            }
        }
        fetchLocation()
    }, [])
    useEffect(() => { 
        const fetchWeather = async () => {
            const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY
            const weatherAPI = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`;
            const responseWeather = await fetch(weatherAPI)
            const dataWeather = await responseWeather.json();
            setWeatherIcon("https:" + dataWeather.current.condition.icon)
            setWeatherStatus(dataWeather.location.name + " " + dataWeather.current.feelslike_c + "°C")
        }
        fetchWeather();
    }, [location])
    return (
        <div className="weather">
            <p className="location"></p>
            <img src={weatherIcon} className="weather-icon" alt="Weather"></img>
            <p className="weather-status">{ weatherStatus }</p>
        </div>
    )
}
export default Weather;