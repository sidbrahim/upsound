import React, { cache } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import spotifyApi from '@/utils/spotify'
import axios from 'axios'



async function getServerSideProps() {


  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: 'grant_type=client_credentials'
  };

  const response = await axios(authOptions);
  const accessToken = response.data.access_token;


  return {accessToken}
}

async function getData(){
  const res = await fetch('http://localhost:3000/api/songs', {cache: 'no-store'});
  if(!res.ok) return notFound();
  return res.json();
}
//fonction pour tester l'api (ce n'est pas ce que cherche à faire)
async function getTrack(id, accessToken){
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  if(!res.ok) return notFound();
  return res.json();
}




const Dashboard = async () => {


  const session = await getServerSession();
  if (!session) {
    redirect('/login')
  }

  const data = await getData();
  console.log(data);

  const { accessToken } = await getServerSideProps();



  return (
    // afficher les chansons de l'utilisateur

    <div>
      {data && data?.map((song) => (
        <div key={song._id}>
          <h1>{song.id}</h1>
          <h1>{song.name}</h1>
          <h1>{song.artist}</h1>
          <h1>{song.duration_ms}</h1>

          <h1>Track</h1>
          <h1>{getTrack(song.id, accessToken)}</h1>


        </div>
))}
    </div>


  )
}

export default Dashboard