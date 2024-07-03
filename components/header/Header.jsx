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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            console.log('scrooled');
            setScrolled(true);
          } else {
            setScrolled(false);
            console.log('not scrooled');

          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        }, []); 


    return (
        <>
        <div className=' w-full'>
            <div className={`flex justify-between header ${scrolled ? 'scrolled' : 'not_scrolled'}`}>
                    <Link href="/">
                        <Image src={Logo} alt="Logo" className=' mobile:w-[30px] mobile:h-[30px]  laptop:w-[100px] laptop:h-[80px] rounded-sm'/>
                    </Link>

                    <ul className={`navbarr ${menuOpen ? 'open' : ''}`}>
                        <li><Link href="#home" className="active">Home</Link></li>
                        <li><Link href="#services">Services </Link></li>
                        <li><Link href="#about">About Us </Link></li>
                        <li><Link href="#contact">Contact </Link></li>
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

export default Header
