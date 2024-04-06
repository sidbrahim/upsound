'use client'
import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import '../../styles/navbar.css'
import Musiques from '../../components/Musiques'
import Navbar from '../../components/Navbar'



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
  //console.log(authOptions);
  const response = await axios(authOptions);
  const accessToken = response.data.access_token;


  return {accessToken}
}

async function getData(){
  const res = await fetch('http://localhost:3000/api/songs', {cache: 'no-store'});
  if(!res.ok) return notFound();
  return res.json();
}



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

const fetchData = async (inputValue) => {
  console.log('searchQuery', inputValue);
try {
  const response = await axios.get('http://localhost:3000/api/songs', {
    params: { search: inputValue },
  });
  setSongs(response.data);
} catch (error) {
  console.error('Error fetching data:', error);
}
};



const Music = async () => {

  const [musiques, setMusiques] = useState([]);

useEffect(() => {
  const getMusiques = async () => {
    const response = await fetch('http://localhost:3000/api/musiques');
    const musiques = await response.json();
    setMusiques(musiques);
  };
  getMusiques();
}, []);


  const session = await getServerSession();
  if (!session) {
    redirect('/login')
  }

  const data = await getData();
  //console.log(data);

  const { accessToken } = await getServerSideProps();

  //const track = await getTrack('0gNNToCW3qjabgTyBSjt3H', accessToken);
  //console.log('image url here:', track.album.images[0].url);
/*
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/songs', {
        params: { search: searchQuery },
      });
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };
*/
  return (

    <div>

<Navbar getSearchResults={(results) => setMusiques(results)}/>


<Musiques musiques={musiques} />

    </div>



//     <div className="container">
//         {data && data?.map(async (song) => (
    
//     <div className="content-music">

      
        
//         <div className="card-container-music">
//             <div className="card-m">
//             <Image fill={true} src={await getTrackImage(song.id, accessToken)} alt=""/>
//                 <div className="information-card-m">
//                     <h2>{song.artist}</h2>
//                     <h3>{song.name}</h3>
//                     <button className="voir-button">
//                         <span>See</span>
//                         <Image src="/icons8-eye-30.png" alt="" width="20" height="20" /> 
//                     </button>
//                     <button className="like-button">
//                         <span>Like</span>
//                         <Image src="/icons8-like-30.png" alt="" width="20" height="20" /> 
//                     </button>
//                 </div> 
//             </div>
//         </div>
//     </div>
//     ))}
// </div>
  )
}

export default Music