'use client'
import React from 'react'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div>
        <ul className="flex justify-between m-10 item-center">
            <div>
                <Link href="/">
                    <li>UPSound</li>
                </Link>
            </div>
            <div className='flex gap-10'>
                <Link href="/dashboard">
                    <li>Dashboard</li>
                </Link>

                <Link href="/login">
                    <li>Se connecter</li>
                </Link>

                <Link href="/register">
                    <li>S'inscrire</li>
                </Link>
            </div>
        </ul>
    </div>
  )
}

export default Navbar