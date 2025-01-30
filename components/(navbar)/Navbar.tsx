'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdAddHome, MdHomeWork, MdPermContactCalendar } from 'react-icons/md';
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri';

interface NavbarProps {
  containerStyles?: string; 
}



const links = [
  { href: '/', label: 'Home', iconNames: <MdHomeWork />},
  { href: '/listing', label: 'Listing', iconNames: <RiCheckboxMultipleBlankFill/>},
  { href: '/contact', label: 'Contact', iconNames: <MdPermContactCalendar /> },
  { href: '/', label: 'Property',iconNames: <MdAddHome /> },
];

const Navbar = ({ containerStyles }: NavbarProps) => {
  
  const pathname = usePathname();

  return (
    <nav className={`${containerStyles}`}>
    {links.map(({ href, label, iconNames }) => (
      <Link
        key={href}
        href={href}
        className={`flexCenter rounded-full px-2 py-1 gap-1 ${pathname === href ? 'active-link' : ''}`}
      >
        {iconNames}
        {label}
      </Link>
    ))}
  </nav>
  )
}

export default Navbar
