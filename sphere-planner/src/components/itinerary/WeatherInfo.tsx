import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Cloud, Loader2, AlertCircle, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface WeatherInfoProps {
  destination: string;
}

export const WeatherInfo = ({ destination }: WeatherInfoProps) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showApiInput, setShowApiInput] = useState(false);

  const fetchWeather = async (key: string) => {
    if (!key) {
      setError("Please enter your OpenWeatherMap API key");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(destination)}&appid=${key}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeatherMap API key.");
        }
        throw new Error("Unable to fetch weather data");
      }
      
      const data = await response.json();
      setWeather(data);
      localStorage.setItem('openweather_api_key', key);
    } catch (err: any) {
      console.error("Error fetching weather:", err);
      setError(err.message || "Unable to load weather information");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem('openweather_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      fetchWeather(savedKey);
    } else {
      setShowApiInput(true);
    }
  }, [destination]);

  if (showApiInput && !apiKey) {
    return (
      <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">Weather Setup</h3>
        </div>
        <div className="space-y-3">
          <p className="text-xs text-purple-900/70">
            Get a free API key from{" "}
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-medium hover:text-purple-700"
            >
              OpenWeatherMap
            </a>
          </p>
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-xs">OpenWeatherMap API Key</Label>
            <Input
              id="api-key"
              type="text"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="text-sm"
            />
          </div>
          <Button 
            onClick={() => fetchWeather(apiKey)}
            className="w-full gradient-primary"
            size="sm"
          >
            Load Weather
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-cyan-900">Current Weather</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowApiInput(!showApiInput)}
          className="h-6 px-2"
        >
          <Settings className="w-3 h-3" />
        </Button>
      </div>

      {showApiInput && (
        <div className="mb-3 space-y-2">
          <Input
            type="text"
            placeholder="Update API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="text-xs"
          />
          <Button 
            onClick={() => fetchWeather(apiKey)}
            className="w-full gradient-primary"
            size="sm"
          >
            Update
          </Button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />
        </div>
      ) : error ? (
        <div className="flex items-start gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      ) : weather ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-cyan-900">
              {Math.round(weather.main.temp)}°C
            </span>
            <span className="text-sm text-cyan-700 capitalize">
              {weather.weather[0].description}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-cyan-900/70">
            <div>Humidity: {weather.main.humidity}%</div>
            <div>Wind: {Math.round(weather.wind.speed)} km/h</div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};
