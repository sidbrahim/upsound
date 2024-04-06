import connect from '@/utils/db';
import Song from '@/models/Song';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){



    try {
        await connect();
        const url = new URL(request.url);
        console.log(request.url);
        const search = url.searchParams.get('query');
        let songs;
        if (search) {
          
          songs = await Song.find({
            $or: [
              { name: { $regex: search, $options: 'i' } }, // Case-insensitive search for name
              { artists: { $regex: search, $options: 'i' } } // Case-insensitive search for artist
            ]
          });
        } else {
          songs = await Song.find({ artists: "['The Gaslight Anthem']" });
        }
        return new NextResponse(JSON.stringify(songs), { status: 200 });
      } catch (err: any) {
        return new NextResponse(err, {
          status: 500,
        });
      }
}