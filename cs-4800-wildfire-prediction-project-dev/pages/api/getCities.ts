// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { City, getCities } from '../../data/cityCache';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<City[]>
) {
  res.status(200).json(await getCities());
}
