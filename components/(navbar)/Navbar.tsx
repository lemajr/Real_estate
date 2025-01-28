'use client'

import { ArrowBigDown } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'



const links = [
  { href: '/', label: 'Home', iconNames: <ArrowBigDown />},
  { href: '/listing', label: 'Listing' },
  { href: '/contact', label: 'Contact' },
  { href: '/add-property', label: 'Property' },
];

const Navbar = ({ containerStyles }: any) => {
  
  const pathname = usePathname();

  return (
    <nav className={`${containerStyles}`}>
    {links.map(({ href, label, iconNames }) => (
      <Link
        key={href}
        href={href}
        className={`flexCenter rounded-full px-2 py-1 ${pathname === href ? 'active-link' : ''}`}
      >
        {iconNames}
        {label}
      </Link>
    ))}
  </nav>
  )
}

export default Navbar
