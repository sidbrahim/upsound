'use client'
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session }: any = useSession()
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

                    {!session ? (
                        <>
                            <Link href="/login">
                                <li>Se connecter</li>
                            </Link>

                            <Link href="/register">
                                <li>S'inscrire</li>
                            </Link>
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
            </ul>
        </div>
    )
}

export default Navbar