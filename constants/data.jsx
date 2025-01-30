import img1 from '@/public/assets/img1.png'
import img2 from '@/public/assets/img2.png'
import img3 from '@/public/assets/img3.png'
import img4 from '@/public/assets/img4.png'
import img5 from '@/public/assets/img5.png'
import blog1 from '@/public/assets//blog1.jpg'
import blog2 from '@/public/assets//blog2.jpg'
import blog3 from '@/public/assets//blog3.jpg'
import blog4 from '@/public/assets//blog4.jpg'

// icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";

// properties data
export const PROPERTIES = [
  {
    id: 1,
    title: "Tranquil Terrace Tranquility Haven",
    image: img1,
    category: "Cottage",
    address: "Via Roma 21",
    country: "Italy",
    city: "Florence",
    area: 450,
    price: 450,
    description: "Charming bungalow with modern amenities and scenic views, perfect for peaceful living.",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    id:2,
    title: "Oceanview Oasis Serenity Escape",
    image: img2,
    category: "Residence",
    address: "Bondi Road 105",
    country: "Australia",
    city: "Sydney",
    area: 500,
    price: 600,
    description: "A beautiful residence with a stunning ocean view, perfect for a serene escape.",
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    id: 3,
    title: "Sunrise Sanctuary Solace Retreat",
    image: img3,
    category: "House",
    address: "Sakura Street 15",
    country: "Japan",
    city: "Kyoto",
    area: 420,
    price: 480,
    description: "A peaceful retreat with modern amenities and beautiful sunrise views.",
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    id:4,
    title: "Urban Elegance Sophistication Haven",
    image: img4,
    category: "Property",
    address: "ubungo",
    country: "Tanzania",
    city: "Dar es salaam",
    area: 550,
    price: 800,
    description: "An elegant urban property with sophisticated design and ample space.",
    facilities: {
      bedrooms: 5,
      bathrooms: 4,
      parkings: 3
    }
  },
  {
    id:5,
    title: "Rustic Retreat Charm Cottage",
    image: img1,
    category: "Villa",
    address: "Carrer de Mallorca 9",
    country: "Spain",
    city: "Barcelona",
    area: 470,
    price: 700,
    description: "A charming rustic villa with modern amenities and scenic views.",
    facilities: {
      bedrooms: 3,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    id: 6,
    title: "Garden Grove Oasis Retreat Haven",
    image: img3,
    category: "Penthouse",
    address: "Rua Visconde de Pirajá 305",
    country: "Brazil",
    city: "Rio de Janeiro",
    area: 520,
    price: 680,
    description: "A luxurious penthouse with a garden grove and breathtaking views.",
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 2
    }
  },
  {
    id: 7,
    title: "Mountain Majesty Tranquility Haven",
    image: img2,
    category: "Home",
    address: "Bahnhofstrasse 88",
    country: "Switzerland",
    city: "Zurich",
    area: 480,
    price: 750,
    description: "A tranquil home with majestic mountain views and modern amenities.",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    id: 8,

    title: "Lakefront Lodge Haven Haven",
    image: img5,
    category: "Apartment",
    address: "Long Street 123",
    country: "South Africa",
    city: "Cape Town",
    area: 430,
    price: 500,
    description: "A cozy lakefront apartment with scenic views and modern amenities.",
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1
    }
  },
  {
    id: 9,

    title: "Serenity Shores Bliss Haven",
    image: img4,
    category: "Villa",
    address: "Sukhumvit Road 42",
    country: "Thailand",
    city: "Bangkok",
    area: 460,
    price: 520,
    description: "A serene villa with blissful surroundings and modern amenities.",
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 1
    }
  },
];


// properties data
export const BLOGS = [
  {
    id: 1,
    title: "Tranquil Terrace Tranquility Haven",
    image: blog1,
    category: "Cottage",
  },
  {
    id: 2,
    title: "Oceanview Oasis Serenity Escape",
    image: blog2,
    category: "Residence",
  },
  {
    id: 3,
    title: "Sunrise Sanctuary Solace Retreat",
    image: blog3,
    category: "House",
  },
  {
    id: 4,
    title: "Urban Elegance Sophistication Haven",
    image: blog4,
    category: "Property",
  }
];



export const FOOTER_LINKS = [
  {
    id: 1,
    title: "Learn More",
    links: [
      { id: 1, label: "About Us", url: "/about" },
      { id: 2, label: "Latest Items", url: "/latest-items" },
      { id: 3, label: "Hot Offers", url: "/hot-offers" },
    ],
  },
  {
    id: 2,
    title: "Our Community",
    links: [
      { id: 4, label: "Terms and Conditions", url: "/terms" },
      { id: 5, label: "Special Offers", url: "/special-offers" },
      { id: 6, label: "Customer Reviews", url: "/reviews" },
    ],
  },
];

export const FOOTER_CONTACT_INFO = {
  id: 1,
  title: "Contact Us",
  links: [
    {id: 1, label: "Contact Number", value: "123-456-7890" },
    { id: 2, label: "Email Address", value: "info@casacentral.com" },
  ],
};

export const SOCIALS = {
  id: 1,
  title: "Social",
  links: [
    {id: 1, icon: <FaFacebook />, id: "facebook" },
    {id: 2, icon: <FaInstagram />, id: "instagram" },
    {id: 3,  icon: <FaTwitter />, id: "twitter" },
  
  ],
};