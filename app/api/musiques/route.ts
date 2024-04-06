import connect from '@/utils/db';
import Song from '@/models/Song';
import { NextResponse } from 'next/server';

export  const GET = async (request: any) => {

  try {
    await connect();
    const songs = await Song.find({artists: "['The Gaslight Anthem']"});
    return new NextResponse(JSON.stringify(songs), { status: 200 });
  }
  catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}