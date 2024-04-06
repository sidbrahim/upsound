import connect from '@/utils/db';
import Song from '@/models/Song';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){

  try {
    await connect();
    const songs = await Song.find({artists: "['The gaslight anthem']"});
    return new NextResponse(JSON.stringify(songs), { status: 200 });
  }
  catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}