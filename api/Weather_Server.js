import axios from 'axios';

import { weather_Key } from './Weather_KEY';

const Weather_Server = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});


Weather_Server.interceptors.request.use(
    async (config) => {
      config.headers.Accept = 'application/json';
      return config;
    },
    (err) => {
      // called when error
      return Promise.reject(err);
    }
  );
  
  export const getWeather = async (callback, lat, long) => {
    const response = await Weather_Server.get(
      `?lat=${lat}&lon=${long}&appid=${weather_Key}`
    );
    callback(response.data);  
  };
  
  export default Weather_Server;
  