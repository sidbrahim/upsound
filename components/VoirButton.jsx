'use client'
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function VoirButton({ id }) {
    const router = useRouter()
    function handleClick() {
        router.push(`/songs/${id}`)
    }
    return (
        <button className="voir-button" onClick={handleClick}>
        <span>See</span>
        <Image src="/icons8-eye-30.png" alt="" width="20" height="20" /> 
    </button>
    )
    }