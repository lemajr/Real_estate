'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdAddHome, MdHomeWork, MdPermContactCalendar } from 'react-icons/md';
import { JSX } from 'react';
import { RiCheckboxMultipleBlankFill } from 'react-icons/ri';

// Define the type for Navbar props
interface NavbarProps {
  containerStyles?: string;
}

// Define the type for the links array
interface NavLink {
  id: number;
  href: string;
  label: string;
  iconNames: JSX.Element;
}

const link = process.env.NEXT_PUBLIC_BASE_END_POINT!
// Links data
const links: NavLink[] = [
  { id: 1, href: '/', label: 'Home', iconNames: <MdHomeWork size={20} /> },
  { id: 2, href: '/listing', label: 'Listing', iconNames: <RiCheckboxMultipleBlankFill size={20} /> },
  { id: 3, href: '/contact', label: 'Contact', iconNames: <MdPermContactCalendar size={20} /> },
  { id: 4, href: `${link}/admin/`, label: 'Property', iconNames: <MdAddHome size={20} /> },
];

const Navbar = ({ containerStyles }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <nav className={`${containerStyles}`}>
      {links.map(({ id, href, label, iconNames }) => (
        <Link
          key={id}
          href={href}
          className={`flexCenter rounded-full px-2 py-1 gap-1 ${
            pathname === href ? 'active-link' : ''
          }`}
          aria-label={label} // Improve accessibility
        >
          {iconNames}
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;