import Image from 'next/image'
import React from 'react'
import HeartBtn from './HeartBtn'
import { MdOutlineBathroom, MdOutlineBed, MdOutlineBedroomBaby, MdOutlineGarage } from 'react-icons/md'
import Link from 'next/link'

const Item = ({ property }: any) => {
  return (
   <div className='rounded-2xl p-5 bg-white font-montserrat'>
     <div className='pbb-2 relative'>
      <Image src={property.image } alt={property.title} width={400} height={200} className='rounded-xl'/>
      <div className='absolute top-4 right-6'>
        {/* Like button */}
        <HeartBtn />
      </div>
    </div>
    <h5 className='bold-16 my-1 text-secondary'>{property.city}</h5>
    <h4 className='medium-18 line-clamp-1'>{property.title}</h4>
    <div className='flex gap-x-2 py-2'>
     <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'> <MdOutlineBed />
         <span>{property.facilities.bedrooms}</span>
     </div>
     <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'> <MdOutlineBathroom />
         <span>{property.facilities.bathroom}</span>
     </div>
     <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'> <MdOutlineGarage />
         <span>{property.facilities.parkings}</span>
     </div>
   </div>
     <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>
     <div className='flexBetween'>
        <div className='bold-20'>Tsh {property.price}.00</div>
        <Link href={'/'}>
        <button className='btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm'>View Details</button>
        </Link>
     </div>
    </div>
  )
}

export default Item
