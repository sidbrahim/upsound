import React, { cache } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import spotifyApi from '@/utils/spotify'
import axios from 'axios'
import Image from 'next/image'



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
  console.log(authOptions);
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
  try{
    const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if(!res.ok) return notFound();
    return res.json();
  }catch(e){
    console.log(e);
  }
  
}

async function getTrackImage(id, accessToken){
  try{
    const res = await getTrack(id, accessToken);
    if(res === null) return notFound();
    return res.album.images[0].url;
  }catch(e){
    console.log(e);
  }
}



const Dashboard = async () => {


  const session = await getServerSession();
  if (!session) {
    redirect('/login')
  }

  const data = await getData();
  console.log(data);

  const { accessToken } = await getServerSideProps();

  //const track = await getTrack('0gNNToCW3qjabgTyBSjt3H', accessToken);
  //console.log('image url here:', track.album.images[0].url);

  return (
    // afficher les chansons de l'utilisateur
    
    <div>
      {data && data?.map(async (song) => (
        <div key={song._id}>
          <h1>{song.id}</h1>
          <h1>{song.name}</h1>
          <h1>{song.artist}</h1>
          <h1>{song.duration_ms}</h1>

          <Image src={await getTrackImage(song.id, accessToken)} width = {200} height= {200} alt="not found"/>
          <h1></h1>


        </div>
))}
    </div>


  )
}

export default Dashboard