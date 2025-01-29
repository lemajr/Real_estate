import Item from '@/components/Item'
import Searchbar from '@/components/Searchbar'
import { PROPERTIES } from '@/constants/data'
import React from 'react'

const Listing = () => {
  return (
   <main className='max-padd-container my-[99px]'>
    <div className='max-padd-container py-10 xl:py-22 bg-[#f8f9fa] rounded-3xl'>
      <div>
        <Searchbar />
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 my-10'>
        {
            PROPERTIES.map((property) => (
                    <Item key={property.title} property={property} />
            ))}
        </div>
      </div>
    </div>
   </main>
  )
}

export default Listing
