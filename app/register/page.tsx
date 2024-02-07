'use client'
import React, {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
 
const Register = () => {

    const [error, setError] = useState("");
    const router = useRouter();

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

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
    }
  return (
    <div className='flex min-h-screen flex-col items-center justify-between p-24 '>
        <div className='bg-[#212121] p-8 rounded shadow-md w-96'>
            <h1 className='text-4xl text-center font-semibold mb-8'>Inscription</h1>
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
              S'inscrire
            </button>

            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            </form>
            <div className="text-center text-gray-500 mt-4">- OU -</div>
            <Link className="block text-center text-blue-500 hover:underline mt-2" href='/login'>Se connecter avec un compte existant</Link>

        </div>
    </div>
  )
}

export default Register