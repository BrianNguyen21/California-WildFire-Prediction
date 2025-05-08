import { Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../components/Data';
import { UserInput } from '../components/UserInput';
import { Map } from '../components/Map';
import { TitleBar } from '../components/TitleBar';
import { City, getCities } from '../data/cityCache';
import { getPredictions } from '../helpers/getPredictions';
import moment from 'moment';

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface ContextType {
  date: moment.Moment;
  setDate: (date: moment.Moment) => void;
  rain_30: number;
  setRain_30: (day: number) => void;
  rain_60: number;
  setRain_60: (day: number) => void;
  rain_90: number;
  setRain_90: (day: number) => void;
  cities: City[];
  setCities: (cities: City[]) => void;
}

export const defaultContext: ContextType = {
  date: moment('2024-04-04', 'YYYY-MM-DD'),
  setDate: () => {
    console.log('why was I called...');
  },
  rain_30: 10,
  setRain_30: () => {
    console.log('why was I called...');
  },
  rain_60: 10,
  setRain_60: () => {
    console.log('why was I called...');
  },
  rain_90: 10,
  setRain_90: () => {
    console.log('why was I called...');
  },
  cities: [],
  setCities: () => {
    console.log('why was I called...');
  },
};

export const Context = React.createContext<ContextType>(defaultContext);

export type StaticProps = {
  cities: City[];
};

const Home: NextPage<StaticProps> = (props: StaticProps) => {
  const [cities, setCities] = useState<City[]>(props.cities);
  const [date, setDate] = useState<moment.Moment>(defaultContext.date);
  const [rain_30, setRain_30] = useState<number>(defaultContext.rain_30);
  const [rain_60, setRain_60] = useState<number>(defaultContext.rain_60);
  const [rain_90, setRain_90] = useState<number>(defaultContext.rain_90);
  const context = useContext(Context);
  useEffect(() => {
    const get = async () => {
      setCities(
        cities.map((city) => {
          city.probability = undefined;
          city.humidity = undefined;
          city.temp = undefined;
          return city;
        })
      );
      await getPredictions(
        context.date,
        context.cities,
        context.rain_30,
        context.rain_60,
        context.rain_90,
        setCities
      );
    };
    get().catch((e) => {
      console.log(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.date, context.rain_30, context.rain_60, context.rain_90]);
  return (
    <Context.Provider
      value={Object.assign(defaultContext, {
        cities,
        setCities,
        date,
        setDate,
        rain_30,
        setRain_30,
        rain_60,
        setRain_60,
        rain_90,
        setRain_90,
      })}
    >
      <Head>
        <title>California Wildfire Predictions</title>
        <meta name="description" content="predicts wildfires in california" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          height: '100vh',
          maxHeight: '100vh',
          width: '100vw',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        <Box>
          <TitleBar />
        </Box>

        <Box>
          <UserInput />
        </Box>

        <Box
          sx={{
            flexShrink: 5,
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: '4 4 auto',
              height: '100%',
              maxHeight: '100%',
              width: '100%',
              overflow: 'hidden',
              backgroundColor: 'gray',
            }}
          >
            <Map />
          </Box>

          <Box
            sx={{
              flex: '1 1 auto',
              height: '100%',
              maxHeight: '100%',
            }}
          >
            <Data />
          </Box>
        </Box>
      </Box>
    </Context.Provider>
  );
};

export async function getStaticProps() {
  // const res = await fetch(API + 'getCities');
  // const data: City[] = await res.json();
  const data: City[] = await await getCities();
  // .filter((el, index) => {
  //   return index % 4 == 0;
  // });
  return {
    props: {
      cities: data,
    } as StaticProps,
  };
}

export default Home;
