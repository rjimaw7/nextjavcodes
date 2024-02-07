'use server';

/* eslint-disable no-console */
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

import { generateRandomNumber } from '@/lib/utils';
import type { ICodes } from '@/shared/interfaces/ICodes';
import type { CodeType } from '@/shared/zod/schema';

// export const fetchCodes = async (query?: string) => {
//   try {
//     const data = query
//       ? await sql<ICodes>`SELECT * FROM codes WHERE title LIKE ${`%${query.toUpperCase()}%`};`
//       : await sql<ICodes>`SELECT * FROM codes ORDER BY created_at DESC`;

//     return data.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch codes.');
//   }
// };

export const fetchCodes = async (query?: string, page = 1, limit = 10) => {
  try {
    // Calculate the offset based on the page number and limit
    const offset = (page - 1) * limit;

    const data = query
      ? await sql<ICodes>`SELECT * FROM codes WHERE title LIKE ${`%${query.toUpperCase()}%`} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`
      : await sql<ICodes>`SELECT * FROM codes ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};`;

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

export const addCode = async (values: CodeType) => {
  try {
    await sql`INSERT INTO codes (title, views, created_at) VALUES (${values.title}, ${generateRandomNumber()}, CURRENT_TIMESTAMP);`;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error('Failed to ADD code.');
  }
  revalidatePath('/');
};

export const updateCode = async (values: CodeType) => {
  try {
    await sql`
    UPDATE codes
    SET title = ${values.title}
    WHERE id = ${values.id}`;
  } catch (error: any) {
    console.error('Database Error:', error);
    throw new Error('Failed to Update code.');
  }
  revalidatePath('/');
};

export const deleteCode = async (id: string) => {
  await sql`DELETE FROM codes WHERE id = ${id};`;

  revalidatePath('/');
};
