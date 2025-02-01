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