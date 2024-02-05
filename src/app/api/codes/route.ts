import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

import type { ICodes } from '@/shared/interfaces/ICodes';

export async function GET() {
  try {
    const result = await sql<ICodes>`SELECT * FROM codes`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
