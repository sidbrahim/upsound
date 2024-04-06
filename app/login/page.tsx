'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React,{use, useEffect, useState} from 'react'
import {signIn, useSession} from 'next-auth/react'
import { set } from 'mongoose';

const Login = () => {

    const router = useRouter();
    const [error, setError] = React.useState("");
    const session = useSession();

    useEffect(() => {
        if (session?.status === "authenticated") {
            router.replace("/music");
        }
      }, [session, router]);


    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    const handleSubmit = async (e: any)=>{
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        
        if (!isValidEmail(email)) {
            setError("Email invalide");
            return;
          }
        
        if (!password || password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères");
            return;
          }

          const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
          })
            if (res?.error) {
                setError("Email ou mot de passe incorrecte")
                if (res?.url) {
                    router.replace("/music")
                }
            } else {
                setError("")
            }
    }

  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 '>
    <div className='bg-[#212121] p-8 rounded shadow-md w-96'>
        <h1 className='text-4xl text-center font-semibold mb-8'>Connexion</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
            />
            <input
          type="password"
          className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
          placeholder="Password"
          required
            />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {" "}
          Se connecter
        </button>

{<p className="text-red-600 text-[16px] mb-4">{error && error}</p> }
        </form>
        <button className='w-full bg-black text-white py-2 rounded hover:bg-gray-800' onClick={() => {signIn("github")}}>Se connecter avec Github</button>
        <div className="text-center text-gray-500 mt-4">- OU -</div>
        <Link className="block text-center text-blue-500 hover:underline mt-2" 
        href='/register'>
            S'inscrire ici
            </Link>

    </div>
</div>
  )
}

export default Login