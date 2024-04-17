
import React, { use } from 'react'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'

import '../../styles/navbar.css'
import Search from '@/components/Search'
import { Suspense } from 'react';
import Songs from '@/components/Songs'

export default async function Music ( {
  searchParams,
}: {
  searchParams?: {
    query?:string;
  };
}) {

  const query = searchParams?.query || '';


  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect('/login')
  }


  return (

    <div className="container">

<Search placeholder='Search for songs' />

<Suspense key={query} fallback={<p>Loading songs...</p>}>
    <Songs query={query}/>
</Suspense>

</div>
  );
}

