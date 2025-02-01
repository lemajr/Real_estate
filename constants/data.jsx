// icons
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa6";


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