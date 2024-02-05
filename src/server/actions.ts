'use server';

/* eslint-disable no-console */
import { sql } from '@vercel/postgres';

import type { ICodes } from '@/shared/interfaces/ICodes';

export const fetchCodes = async () => {
  try {
    // const data = await sql<ICodes>`SELECT * FROM codes LIMIT 10`;
    const data = await sql<ICodes>`SELECT * FROM codes`;

    console.log('SERVER : ', data);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch codes.');
  }
};

export const fetchCodeById = async (id: string) => {
  try {
    const data = await sql<ICodes>`
        SELECT
          codes.id,
          codes.title,
          codes.views
        FROM codes
        WHERE codes.id = '${id}';
      `;

    const codes = data.rows.map((code) => ({ ...code }));

    return codes[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch code.');
  }
};
