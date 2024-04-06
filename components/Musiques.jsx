
export default async function Musiques({musiques}) {
    return (
        <div className="container">
        {musiques && musiques?.map(async (song) => (
    
    <div className="content-music">
        <div className="card-container-music">
            <div className="card-m">
            <Image fill={true} src={await getTrackImage(song.id, accessToken)} alt=""/>
                <div className="information-card-m">
                    <h2>{song.artist}</h2>
                    <h3>{song.name}</h3>
                    <button className="voir-button">
                        <span>See</span>
                        <Image src="/icons8-eye-30.png" alt="" width="20" height="20" /> 
                    </button>
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