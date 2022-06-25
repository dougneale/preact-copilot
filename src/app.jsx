// melbourne weather report website with bootstrap
import React, { useState, useEffect } from "react";




// Weather component
const Weather = () => {
  const [weather, setWeather] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [city, setCity] = useState("Melbourne");
  const [country, setCountry] = useState("AU");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const appKey = "2a2684e67851609fc327eebf68261d8b";

  useEffect(() => {
    const fetchWeather = async () => {
      // debug
      setLoading(true);
      setError(false);
      setHasLoaded(false);

      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appKey}`
        );
        console.log(response);
        const data = await response.json();
        setWeather(data);
        setHasLoaded(true);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, country]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Weather App</h1>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter city"
              value={city}
              onBlur={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter country"
              value={country}
              onBlur={(e) => setCountry(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="alert alert-danger" role="alert">
                City not found
              </div>
            </div>
          ) : hasLoaded ?(
            <div className="text-center">
              <div className="alert alert-success" role="alert">
                {weather.name} {weather?.sys?.country}
              </div>
              <div className="alert alert-success" role="alert">
                {weather?.weather[0].main}
              </div>
              <div className="alert alert-success" role="alert">
                {Math.round(weather?.main.temp - 273.15)}°C
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="alert alert-info" role="alert">
                Please enter city and country
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

   


export const App = () => {
  return (
    <div>
      <h1>Melbourne Weather</h1>
      <Weather />
    </div>
  );
}

