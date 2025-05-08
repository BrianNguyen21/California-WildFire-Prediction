import { Prediction } from '../pages/api/predict';
import { City } from '../data/cityCache';
import { PredictionInput } from '../pages/api/predict';
import { API } from '../pages';

export const getPredictions = async (
  date: moment.Moment,
  cities: City[],
  rain_30: number,
  rain_60: number,
  rain_90: number,
  setCities: (cities: City[]) => void
) => {
  for (const index in cities) {
    const city = cities[index];
    const hash =
      (6 - Math.abs((parseInt(date.format('MMDDYYYY')) - 7000000) / 1000000)) /
      6;
    console.log(hash);
    const temp = hash * 30 + 50 + (city.lat - 32);
    const humidity = hash / 10 + 0.45 + (city.lat / 100 - 0.32);
    const res = await fetch(API + 'requestcall/', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: date.toDate().getDate(),
        month: date.toDate().getMonth(),
        year: date.toDate().getFullYear(),
        lat: city.lat,
        lng: city.lng,
        thirty: rain_30,
        sixty: rain_60,
        ninety: rain_90,
        temp,
        humidity,
      } as PredictionInput),
    });
    const data = (await res.json()) as Prediction & { prediction: number };
    // console.log(data);
    data.probability = data.prediction;
    // data.probability = Math.random() * 0.7;
    data.temp = temp;
    data.humidity = humidity;
    cities[index] = Object.assign(city, data);
    setCities([...cities]);
  }
};
