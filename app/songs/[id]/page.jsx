import Song from '@/components/Song';
import RecBut from '@/components/RecBut';



export default async function ShowSong({params}) {


    return (
  <div className="container">
    <Song query={params.id} />
    <RecBut id={params.id} />
    
  </div>
    )
}