import rent from '@/public/assets/rent.png'
import conference from '@/public/assets/conference.png'
import consultancy from '@/public/assets/consultancy.jpg'
import management from '@/public/assets/management.jpg'


// icons
import {
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { ImWhatsapp } from 'react-icons/im';



// properties data
export const SERVICES = [
  {
    id: 1,
    title: "Hotel & Apartment Allocation",
    image: rent,
    category: "Experience over 5 years",
  },
  {
    id: 2,
    title: "Conference Venue Provision",
    image: conference,
    category: "Professional Event Spaces",
  },
  {
    id: 3,
    title: "Business Consultancy",
    image: consultancy,
    category: "Expert Business Advice",
  },
  {
    id: 4,
    title: "Property Management",
    image: management,
    category: "Comprehensive Property Services",
  },
];



export const FOOTER_LINKS = [
  {
    id: 1,
    title: "Learn More",
    links: [
      { id: 1, label: "About Us", url: "/#about" },
      { id: 2, label: "Our Services", url: "/#hot-offers" },
    ],
  },
  {
    id: 2,
    title: "Our Community",
    links: [
      { id: 3, label: "Contact", url: "/contact" },
      { id: 5, label: "Special Offers", url: "/listing" },
    ],
  },
];

// export const FOOTER_CONTACT_INFO = {
//   id: 1,
//   title: "Contact Us",
//   links: [
//     {id: 1, label: "Contact Number", value: "+255 744 135 000" },
//     { id: 2, label: "Email Address", value: "info@casacentral.com" },
//   ],
// };

export const SOCIALS = {
    title: "Follow Us",
    links: [
      { id: 1, icon: <FaFacebook />, url: "https://facebook.com/jackobonchimbi" },
      { id: 3, icon: <ImWhatsapp />, url: "https://wa.me/255744135000" },
      { id: 2, icon: <FaInstagram />, url: "https://instagram.com/blackwill54" },
    ],
  };