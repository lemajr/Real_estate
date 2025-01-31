import Image from 'next/image';
import React from 'react';
import HeartBtn from './HeartBtn';
import { MdOutlineBathroom, MdOutlineBed, MdOutlineGarage } from 'react-icons/md';
import Link from 'next/link';

interface Facilities {
  bedrooms?: number;
  bathrooms?: number;
  parkings?: number;
}

interface Property {
  id: number;
  title: string;
  city: string;
  image: string;
  facilities?: Facilities;
  description: string;
  price: string; 
}

interface ItemProps {
  property: Property;
}

const Item: React.FC<ItemProps> = ({ property }) => {
  return (
    <div className='rounded-2xl p-5 bg-white font-montserrat'>
      <div className='pb-2 relative'>
        {/* Load remote image */}
        <Image 
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${property.image}`} 
          alt={property.title} 
          width={400} 
          height={200} 
          className='rounded-xl object-cover' 
        />
        <div className='absolute top-4 right-6'>
          <HeartBtn />
        </div>
      </div>
      <h5 className='bold-16 my-1 text-secondary'>{property.city}</h5>
      <h4 className='medium-18 line-clamp-1'>{property.title}</h4>

      {/* Facilities Section */}
      <div className='flex gap-x-2 py-2'>
        {property.facilities && (
          <>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'>
              <MdOutlineBed /> <span>{property.facilities.bedrooms || 0}</span>
            </div>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'>
              <MdOutlineBathroom /> <span>{property.facilities.bathrooms || 0}</span>
            </div>
            <div className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'>
              <MdOutlineGarage /> <span>{property.facilities.parkings || 0}</span>
            </div>
          </>
        )}
      </div>

      <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>

      <div className='flexBetween'>
        <div className='bold-20'>Tsh {parseFloat(property.price).toLocaleString()}.00</div>
        <Link href={`/listing/${property.id}`}>
          <button className='btn-secondary rounded-xl !py-[7px] !px-5 shadow-sm'>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Item;
