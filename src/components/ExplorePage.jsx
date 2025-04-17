import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
  Search,
  MapPin,
  Loader,
  Globe,
  Camera,
  Cloud,
  ArrowDown,
  ThermometerSun,
} from "lucide-react";

function ExplorePage() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularCities, setPopularCities] = useState([
    "Paris",
    "New York",
    "Tokyo",
    "London",
    "Sydney",
    "Dubai",
  ]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    
    searchInputRef.current?.focus();

    
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
    }
  }, []);

  const handleSearch = async (cityName = city) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4f3854a84bf2d5342cf7d6777f576c1d&units=metric`
      );

      const photosRes = await axios.get(
        `https://pixabay.com/api/?key=49602403-cf52bb7ee9e1a139ac86dd5b2&q=${cityName}+city&image_type=photo&per_page=9`
      );

      const newData = {
        weather: weatherRes.data,
        photos: photosRes.data.hits,
        timestamp: new Date().toISOString(),
      };

      setData(newData);

      
      const updatedSearches = [
        cityName,
        ...recentSearches.filter((s) => s !== cityName),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    } catch (error) {
      console.error(error);
      setError(
        error.response?.status === 404
          ? "City not found. Please check the spelling and try again."
          : "An error occurred while fetching data. Please try again later."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white relative">
     
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/50 to-blue-900/80 backdrop-filter backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-6">
          <Globe className="text-blue-300 mr-3" size={36} />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Explore Cities
          </h1>
        </div>

        <p className="text-center text-xl text-blue-100 max-w-3xl mx-auto mb-12">
          Discover the weather, sights, and feel of any city around the world
          with just a search.
        </p>

        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative flex rounded-full bg-white/10 backdrop-blur-md border border-white/30 overflow-hidden">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Enter city name..."
                className="flex-1 bg-transparent p-4 text-white placeholder:text-blue-200 focus:outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium flex items-center transition-all duration-300 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <Search size={20} className="mr-2" />
                )}
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Recent and popular searches */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {recentSearches.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mr-4">
                <span className="text-sm text-blue-300">Recent:</span>
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setCity(item);
                      handleSearch(item);
                    }}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-blue-300">Popular:</span>
              {popularCities.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setCity(item);
                    handleSearch(item);
                  }}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-12 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
            <p className="text-white">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="max-w-3xl mx-auto mb-12 flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-blue-200">Gathering city information...</p>
          </div>
        )}

        {/* Results section */}
        {data && !loading && (
          <div className="fade-in animate-fade-in">
            {/* City header with main info */}
            <div className="mb-12 text-center">
              <div className="flex items-center justify-center mb-3">
                <MapPin className="text-blue-300 mr-2" size={24} />
                <h2 className="text-3xl md:text-4xl font-bold">
                  {data.weather.name}, {data.weather.sys.country}
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-8 mt-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center">
                  <div className="text-5xl font-light mb-2">
                    {Math.round(data.weather.main.temp)}°C
                  </div>
                  <div className="capitalize text-lg">
                    {data.weather.weather[0].description}
                  </div>
                  {/* Use weather emoji based on icon code */}
                  <div className="text-4xl mt-2">
                    {data.weather.weather[0].icon.includes("01") && "☀️"}
                    {data.weather.weather[0].icon.includes("02") && "🌤️"}
                    {data.weather.weather[0].icon.includes("03") && "⛅"}
                    {data.weather.weather[0].icon.includes("04") && "☁️"}
                    {data.weather.weather[0].icon.includes("09") && "🌧️"}
                    {data.weather.weather[0].icon.includes("10") && "🌦️"}
                    {data.weather.weather[0].icon.includes("11") && "⛈️"}
                    {data.weather.weather[0].icon.includes("13") && "❄️"}
                    {data.weather.weather[0].icon.includes("50") && "🌫️"}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-blue-300 text-sm">Feels like</div>
                      <div className="text-2xl">
                        {Math.round(data.weather.main.feels_like)}°C
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-blue-300 text-sm">Humidity</div>
                      <div className="text-2xl">
                        {data.weather.main.humidity}%
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-blue-300 text-sm">Wind</div>
                      <div className="text-2xl">
                        {Math.round(data.weather.wind.speed)} m/s
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-blue-300 text-sm">Pressure</div>
                      <div className="text-2xl">
                        {data.weather.main.pressure} hPa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos grid */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Camera className="text-blue-300 mr-2" size={24} />
                <h3 className="text-2xl font-semibold">City Views</h3>
              </div>

              {data.photos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.photos.slice(0, 9).map((photo, index) => (
                    <div
                      key={photo.id}
                      className="aspect-square overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
                    >
        
                      <img
                        src={photo.largeImageURL} 
                        alt={`${data.weather.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                        <p className="truncate">
                          Photo {index + 1} • City: {data.weather.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center bg-white/5 backdrop-blur-md rounded-lg p-6">
                  <Cloud className="mx-auto mb-4 text-blue-300" size={48} />
                  <p>No photos found for this city. Try another search term.</p>
                </div>
              )}

             
            </div>

            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <ThermometerSun className="text-blue-300 mr-2" size={24} />
                <h3 className="text-2xl font-semibold">Weather Insights</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium mb-2 text-blue-200">
                    Current Conditions
                  </h4>
                  <p className="text-blue-100 mb-4">
                    The current weather in {data.weather.name} is{" "}
                    {data.weather.weather[0].description} with a temperature of{" "}
                    {Math.round(data.weather.main.temp)}°C. The minimum
                    temperature today is{" "}
                    {Math.round(data.weather.main.temp_min)}°C and the maximum
                    is {Math.round(data.weather.main.temp_max)}°C.
                  </p>

                  <h4 className="text-lg font-medium mb-2 text-blue-200">
                    Sunrise & Sunset
                  </h4>
                  <div className="flex justify-between mb-4">
                    <div>
                      <div className="text-blue-300 text-sm">Sunrise</div>
                      <div>
                        {new Date(
                          data.weather.sys.sunrise * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-blue-300 text-sm">Sunset</div>
                      <div>
                        {new Date(
                          data.weather.sys.sunset * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2 text-blue-200">
                    Local Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Coordinates:</span>
                      <span>
                        {data.weather.coord.lat.toFixed(2)}° N,{" "}
                        {data.weather.coord.lon.toFixed(2)}° E
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Timezone:</span>
                      <span>
                        UTC {data.weather.timezone / 3600 >= 0 ? "+" : ""}
                        {data.weather.timezone / 3600}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Visibility:</span>
                      <span>
                        {(data.weather.visibility / 1000).toFixed(1)} km
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-300">Local Time:</span>
                      <span>
                        {new Date(
                          Date.now() + data.weather.timezone * 1000
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last updated info */}
            <div className="text-center mt-8 text-sm text-blue-300">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </div>
          </div>
        )}

        {/* Initial state - no search performed yet */}
        {!data && !loading && !error && (
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
              <ArrowDown
                className="mx-auto mb-4 animate-bounce text-blue-300"
                size={32}
              />
              <h3 className="text-2xl font-medium mb-4">
                Enter a city name above to begin exploring
              </h3>
              <p className="text-blue-100">
                Search for any city to discover current weather conditions, view
                beautiful city photos, and learn more about your destination.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
