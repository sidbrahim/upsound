import axios from "axios";
import Image from 'next/image';
import { notFound } from "next/navigation";
import VoirButton from "@/components/VoirButton";

async function getSearchData(query:any){
    const res = await fetch(`http://localhost:3000/api/musiques?search=${query}`, {cache: 'no-store'});
    if(!res.ok) return notFound();
    return res.json();
  }
  
  
  
  async function getTrack(id:any, accessToken:any){
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
  
  async function getTrackImage(id:any, accessToken:any){
    try{
      const res = await getTrack(id, accessToken);
      if(res === null) return notFound();
      return res.album.images[0].url;
    }catch(e){
      console.log(e);
    }
  }

  async function getspotifyaccesstoken() {


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

export default async function Song({
    query,
  }: {
    query: string;
  }) {

    const data = await getSearchData(query);

  const { accessToken } = await getspotifyaccesstoken();

    return (
<div className="container">
{data && data?.map(async (song:any) => (
    
    <div className="content-music">

      
        
        <div className="card-container-music">
            <div className="card-m">
            <Image fill={true} src={await getTrackImage(song.id, accessToken)} alt=""/>
                <div className="information-card-m">
                    <h2>{song.artist}</h2>
                    <h3>{song.name}</h3>
                    <VoirButton id={song.id} />
                    <button className="like-button">
                        <span>Like</span>
                        <Image src="/icons8-like-30.png" alt="" width="20" height="20" /> 
                    </button>
                </div> 
            </div>
        </div>
    </div>
    ))}
</div>

        
    )

  }

  
