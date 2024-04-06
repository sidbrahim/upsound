import React from 'react'
import '../styles/navbar.css'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
 
  return (
    <div className="sidebar">
    <nav>
        <ul>
            <li ><Link href="/"><Image src="/icons8-home-50.png" alt="" width={20} height={20} />Home</Link></li>
            <li> <Link href="/music"><Image src="/icons8-musical-note-50.png" alt=""width={20} height={20} />Music </Link></li>
            <li><Link href="/page3"><Image src="/icons8-love-48.png" alt="" width={20} height={20}/> Likes</Link></li>
        </ul>
    </nav>
    </div>
  )
}

export default Sidebar