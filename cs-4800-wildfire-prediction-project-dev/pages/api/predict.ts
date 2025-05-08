import { NextApiRequest, NextApiResponse } from 'next';

export interface PredictionInput {
  day: number;
  month: number;
  year: number;

  lat: number;
  lng: number;

  thirty: number;
  sixty: number;
  ninety: number;

  temp: number;
  humidity: number;
}

export interface Prediction {
  probability: number;
  temp: number;
  humidity: number;
}

export default function handler(
  req: Omit<NextApiRequest, keyof { body: PredictionInput }> & {
    body: PredictionInput;
  },
  res: NextApiResponse<Prediction>
) {
  if (req.method === 'POST') {
    res.status(200).send({
      probability: Math.random(),
      temp: Math.random() * 50 + 50,
      humidity: Math.random(),
    });
  } else {
    res.status(400);
  }
}
