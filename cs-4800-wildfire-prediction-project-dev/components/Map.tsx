import { ReactElement, useContext, useMemo } from 'react';
import React from 'react';
import DeckGL from '@deck.gl/react/typed';
import { GeoJsonLayer } from '@deck.gl/layers/typed';
import { Map as MapBox } from 'react-map-gl';
import { Context } from '../pages';

export const Map = (): ReactElement => {
  const context = useContext(Context);
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const layers = useMemo(() => {
    return [
      new GeoJsonLayer({
        parameters: {
          blend: true,
        },
        id: 'geojson',
        filled: true,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 500,
        opacity: 1,
        getPointRadius: (f) => {
          return f?.properties?.chance
            ? Math.pow(10, f.properties.chance) * 5000
            : 0;
        },
        getFillColor: (f) => {
          const chance = (1 - f?.properties?.chance) as number;
          return [
            255 - (chance * 255) / 2,
            chance * 255,
            30,
            f?.properties?.chance * 100 + 25,
          ];
        },
        data:
          // {
          //   type: 'FeatureCollection',
          //   features:
          [
            ...context.cities
              .filter((city) => city.probability)
              .map((city) => {
                // console.log(city, (city.probability || 0) * 4);
                return {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [city.lng, city.lat],
                  },
                  properties: {
                    name: city.name,
                    chance: city.probability || 0,
                  },
                };
              }),
          ],
        // },
      }),
    ];
  }, [context.cities]);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      style={{ position: 'relative', height: '100%', width: '100%' }}
    >
      <MapBox
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_API_KEY}
      />
    </DeckGL>
  );
};
