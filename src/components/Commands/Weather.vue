<script setup lang="ts">
import { useTerminalStore } from '../../stores/terminal.store';

const errorMessage = ref("")

//#region HANDLE VISIBILITY OF TERMINAL INPUT
const terminalStore = useTerminalStore()
terminalStore.componentIsProcessing = true
const isFinished = ref(false) // Used to determine if the component is finished processing
watchEffect(() => {
    if (errorMessage.value) {
        terminalStore.componentIsProcessing = false
    }
    if (isFinished.value) {
        terminalStore.componentIsProcessing = false
    }
})
//#endregion
// =================================================================================================
//#region GEOLOCATION
const isLocating = ref(false)

onBeforeMount(async () => {
    isLocating.value = true
    geoFindMe();
});

function geoFindMe() {
    const timeout = 10000

    function success(position: GeolocationPosition) {
        isLocating.value = false
        fetchWeather(position.coords.latitude, position.coords.longitude)
    }

    function error(e: GeolocationPositionError) {
        isLocating.value = false;
        if (e.PERMISSION_DENIED) {
            errorMessage.value = "Permission for geolocation denied"
        } else if (e.POSITION_UNAVAILABLE) {
            errorMessage.value = "Position unavailable"
        } else if (e.TIMEOUT) {
            errorMessage.value = "Timeout"
        }
    }

    if (!navigator.geolocation) {
        errorMessage.value = "Geolocation is not supported by your browser"
        isLocating.value = false
    } else {
        navigator.geolocation.getCurrentPosition(success, error, { timeout })
    }
}
//#endregion
// =================================================================================================
//#region FETCH AND DISPLAY WEATHER
const isFetchingWeather = ref(false)
const currentWeatherShort = ref("")
const currentWeatherTemp = ref("")
const currentWeatherWindspeed = ref("")
const currentWeatherWinddirection = ref("")
const weatherForecast = ref<string[]>([])

// Is only valid for the specific URL
interface WeatherData {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        weathercode: number;
        time: string;
    };
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        precipitation_sum: string;
        precipitation_hours: string;
        precipitation_probability_max: string;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_sum: number[];
        precipitation_hours: number[];
        precipitation_probability_max: number[];
    };
}

async function fetchWeather(latitude: number, longitude: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,precipitation_probability_max&current_weather=true&forecast_days=3&timezone=auto`
    isFetchingWeather.value = true
    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data: WeatherData) => {
            setWeatherData(data)
            isFinished.value = true
        })
        .catch(() => {
            errorMessage.value = "Error fetching weather"
        })
        .finally(() => {
            isFetchingWeather.value = false
        })
}

function setWeatherData(data: WeatherData) {
    currentWeatherShort.value = `${weatherCodeToDesription(data.current_weather.weathercode)}`
    currentWeatherTemp.value = `${data.current_weather.temperature}°C`
    currentWeatherWindspeed.value = `${data.current_weather.windspeed}km/h`
    currentWeatherWinddirection.value = data.current_weather.winddirection + "deg"
    weatherForecast.value = data.daily.time.map((day, index) => {
        return `On ${new Date(day).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, the temperature will be between ${data.daily.temperature_2m_min[index]} and ${data.daily.temperature_2m_max[index]} ${data.daily_units.temperature_2m_max}. There is a ${data.daily.precipitation_probability_max[index]}% chance of precipitation.`
    })
}

function weatherCodeToDesription(weatherCode: number) {
    switch (weatherCode) {
        case 0:
            return "Clear sky";
        case 1:
        case 2:
        case 3:
            return "Partly cloudy";
        case 45:
        case 48:
            return "Fog and depositing rime fog";
        case 51:
        case 53:
        case 55:
            return "Drizzle: Light, moderate, and dense intensity";
        case 56:
        case 57:
            return "Freezing Drizzle: Light and dense intensity";
        case 61:
        case 63:
        case 65:
            return "Rain: Slight, moderate and heavy intensity";
        case 66:
        case 67:
            return "Freezing Rain: Light and heavy intensity";
        case 71:
        case 73:
        case 75:
            return "Snow fall: Slight, moderate, and heavy intensity";
        case 77:
            return "Snow grains";
        case 80:
        case 81:
        case 82:
            return "Rain showers: Slight, moderate, and violent";
        case 85:
        case 86:
            return "Snow showers: Slight and heavy";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
        case 99:
            return "Thunderstorm with slight and heavy hail";
        default:
            return "Unknown weather code";
    }
}
//#endregion

</script>

<template>
    <div>
        <LoadingDisplay v-if="isLocating" text="Locating..." />
        <p v-else-if="errorMessage" class="text-red-700">{{ errorMessage }}</p>
        <LoadingDisplay v-else-if="isFetchingWeather" text="Fetching weather..." />
        <div v-else>
            <div class="border border-dashed w-fit p-2 my-1">
                <p>{{ currentWeatherShort }}</p>
                <p>{{ currentWeatherTemp }}</p>
                <div class="flex gap-2">
                    <div :style="{ rotate: currentWeatherWinddirection }">
                        <i class="bi bi-arrow-up" aria-describedby="winddirection-description"></i>
                        <p class="sr-only" id="winddirection-description">Winddirection of {{ currentWeatherWinddirection }}
                        </p>
                    </div>
                    <p aria-describedby="windspeed-description">{{ currentWeatherWindspeed }}</p>
                    <p class="sr-only" id="windspeed-description">Windspeed</p>
                </div>
            </div>
            <div>
                <p>3 day forecast:</p>
                <p v-for="forecast in weatherForecast">{{ forecast }}</p>
            </div>
            <Source text="Open Meteo" url="https://open-meteo.com/" />
        </div>
    </div>
</template>

<style scoped></style>


  
  