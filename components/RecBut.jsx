'use client';
import { useState } from 'react';
import { useEffect } from 'react';








export default function RecButton(id){

  const [recs, setRecs] = useState([]);

  useEffect(() => {
    getRecommendations(id);
  }, [id]);


  async function getRecommendations(id) {
    await fetch('http://localhost:8000/songRec?id=' + id.id)
      .then((response) => response.json())
      .then((data) => {
        setRecs(data);
        console.log(data); 
      })
      .catch((error) => {
        console.error('Error fetching recommendations:', error);
      });
  }
  return (
    <div>

    <ul>
    {recs && recs?.map((rec) => (
      <li key={rec.id}>{rec.name} - {rec.year} - {rec.artists} </li>

      
    ))}
    </ul>

    </div>


    )
}


