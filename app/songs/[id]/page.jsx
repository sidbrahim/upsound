import { Suspense } from 'react';
import Song from '@/components/Song';
import Search from '@/components/Search';





export default async function ShowSong({params}) {

    return (
  <div className="container">
    <Song query={params.id}/>
  </div>
    )
}