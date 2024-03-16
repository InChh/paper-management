import type { Api } from '@/typings/api';
import { request } from '@/service/request';

export function weatherForecast(params: Api.Weather.WeatherRequestParams) {
  return request<Api.Weather.WeatherInfo>({
    url: 'https://devapi.qweather.com/v7/weather/now',
    method: 'GET',
    params
  });
}
