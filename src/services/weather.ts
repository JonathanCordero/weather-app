const API_KEY = process.env.EXPO_PUBLIC_TOMORROW_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Tomorrow.io API key');
}

const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';

let cachedData: any = null;
let lastFetchTime = 0;

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getCurrentWeather(
  latitude: number,
  longitude: number
) {
  const now = Date.now();

  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  const url = `${BASE_URL}?location=${latitude},${longitude}&apikey=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const json = await response.json();

  cachedData = json;
  lastFetchTime = now;

  return json;
}
