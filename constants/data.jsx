import rent from '@/public/assets/rent.png'
import conference from '@/public/assets/conference.png'
import consultancy from '@/public/assets/consultancy.jpg'
import management from '@/public/assets/management.jpg'


// icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";



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
    title: "Follow Us",
    links: [
      { id: 1, icon: <FaFacebook />, url: "https://facebook.com" },
      { id: 2, icon: <FaInstagram />, url: "https://instagram.com" },
      { id: 3, icon: <FaTwitter />, url: "https://twitter.com" },
    ],
  };