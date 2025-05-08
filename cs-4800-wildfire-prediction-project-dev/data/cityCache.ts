import csv from 'csv-parser';
import fs from 'fs';

export type City = {
  name: string;
  lat: number;
  lng: number;
  probability?: number;
  temp?: number;
  humidity?: number;
};
type CSVData = {
  Name: string;
  Latitude: string;
  Longitude: string;
};

export const cities: City[] = [];

export const getCities = (): Promise<City[]> => {
  return new Promise((res) => {
    if (cities.length == 0) {
      fs.createReadStream('./data/cal_cities_lat_long.csv')
        .pipe(csv())
        .on('data', (data: CSVData) => {
          cities.push({
            name: data.Name,
            lat: parseFloat(parseFloat(data.Latitude).toFixed(3)),
            lng: parseFloat(parseFloat(data.Longitude).toFixed(3)),
          });
        })
        .on('end', () => {
          res(cities);
        });
    } else {
      res(cities);
    }
  });
};
