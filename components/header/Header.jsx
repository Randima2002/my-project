'use client';
import React, { useEffect, useState } from 'react';
import './Header.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './icons'; // Import the icons
import Logo from './../../public/Logo.webp';
import Image from 'next/image';

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (link) => {
        setActive(link);
    };

    return (
        <>
        <div className='w-full'>
            <div className={`flex justify-between header ${scrolled ? 'scrolled' : 'not_scrolled'}`}>
                <Link href="/">
                    <Image src={Logo} alt="Logo" className='mobile:w-[30px] mobile:h-[30px] laptop:w-[100px] laptop:h-[80px] rounded-sm'/>
                </Link>

                <ul className={`navbarr ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link href="#home" className={active === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="#rooms" className={active === 'rooms' ? 'active' : ''} onClick={() => handleLinkClick('rooms')}>
                            Rooms
                        </Link>
                    </li>
                    <li>
                        <Link href="#about" className={active === 'about' ? 'active' : ''} onClick={() => handleLinkClick('about')}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="#contact" className={active === 'contact' ? 'active' : ''} onClick={() => handleLinkClick('contact')}>
                            Contact
                        </Link>
                    </li>
                </ul>

                <div className="mainn">
                    <FontAwesomeIcon
                        icon={menuOpen ? 'times' : 'bars'}
                        id="menu-icon"
                        onClick={toggleMenu}
                    />
                </div>
            </div>
        </div>
    </>
    )
}

export default Header;
