import connect from '@/utils/db';
import Song from '@/models/Song';
import { NextRequest, NextResponse } from 'next/server';

export  const GET = async (request: NextRequest) => {



  try {
    await connect();
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    let songs;

    songs = await Song.find({id: search})

    return new NextResponse(JSON.stringify(songs), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
}