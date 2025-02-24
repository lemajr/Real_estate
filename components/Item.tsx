import Image from 'next/image';
import React from 'react';
import HeartBtn from './HeartBtn';
import Link from 'next/link';
import { MapPinHouse } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  city: string;
  image: string;
  description: string;
  price: string;
  address: string;
  country: string;

}

interface ItemProps {
  property: Property;
}

const Item: React.FC<ItemProps> = ({ property }) => {

  const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${property.image}`;

  return (
    <div className='rounded-2xl p-5 bg-white font-montserrat'>

      <div className='pb-2 relative'>
        <Link href={`/listing/${property.id}`}>
        <Image 
          src={imageUrl} 
          alt={property.title} 
          width={400} 
          height={200} 
          className='rounded-xl lg:h-[12rem] object-cover' 
        />
        </Link>
        <div className='absolute top-4 right-6'>
          <HeartBtn />
        </div>
      </div>

      <div className='font-bold text-gray-30 truncate'>Tsh: {parseFloat(property.price).toLocaleString()} </div>
      <h4 className='medium-18  line-clamp-1'>{property.title}</h4>

      <p className='pt-2 mb-4 line-clamp-2'>{property.description}</p>

      <div className='flexBetween '>
      <h5 className='my-1 text-gray-30 flex gap-2'><MapPinHouse /> {property.city}</h5>

        <Link href={`/listing/${property.id}`}>
          <button className='btn-secondary rounded-lg !py-[6px] !px-2 shadow-sm truncate'>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Item;


