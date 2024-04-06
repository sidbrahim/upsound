'use client';
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import '../styles/navbar.css'
import Image from 'next/image'
import { useState } from "react";
import axios from 'axios';


const Navbar = ({ getSearchResults } : any ) => {
    const [query, setQuery] = useState('');
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch(`/api/search?query=${query}`);

        const musique = await response.json();

        getSearchResults(musique);

    }

  
  

  
    
    const { data: session }: any = useSession()
    return (
    <header>   
        <div>
            <nav className="bar">
                <div className="nav">
                    
                        <div className="nav-items">
                            <Link href="/">
                                <Image src="/logo.png" className="logo" width={0} height={0} alt="" />
                            </Link>
                       
                            <div className='search-bar'>
                                <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Search music..." value={query} onChange={(e) => setQuery(e.target.value)} />
                                <button type="submit">Search</button>
                                {/* <Image src="/search.png" className="search-icon" alt="" width={10} height={10} /> */}
                                </form>
                            </div>
                            
                                {!session ? (
                                    <>
                                    <div className="item">
                                        <Link href="/login">
                                        <Image src="" className ="sign-up" alt="" width={0} height={0}/> <button>Sign In</button>
                                        </Link>

                                        <Link href="/register">
                                            <Image className ="log" src="" alt="" width={0} height={0}/>  <button> Log in </button>
                                        </Link>
                                     </div>   
                                    </>
                                ) : (
                                    <>
                                    {session.user?.email}
                                    <li>
                                        <button className= "p-2 px-5 -mt-1 bg-blue-800 rounded-full" 
                                        onClick={() => signOut()}>Se déconnecter</button>
                                    </li>
                                    </>
                                )
                                }


                            
                        </div>    
                 </div>   
                
             </nav>   
        </div>
    </header>     
    )
}

export default Navbar