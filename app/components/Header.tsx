'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from './ui/resizable-navbar';

interface HeaderProps {
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ scrollToSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  const handleNavigation = (link: string) => {
    if (link.startsWith('#')) {
      const sectionId = link.substring(1);
      handleScrollToSection(sectionId);
    } else {
      router.push(link);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'خانه', link: '#home' },
    { name: 'درباره ما', link: '#about' },
    { name: 'خدمات', link: '#services' },
    { name: 'تماس', link: '#contact' }
  ];

  const Logo = () => (
    <div className="flex items-center space-x-3 rtl:space-x-reverse group cursor-pointer" onClick={() => handleScrollToSection('home')}>
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/25 ring-2 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-pink-500/40">
          <span className="text-white font-bold text-lg sm:text-xl drop-shadow-lg">د</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
        </div>
        <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
          دکتر بهروز مسعودی
        </h1>
      </div>
    </div>
  );

  const MobileNavItems = () => (
    <div className="flex flex-col space-y-3 w-full">
      {navItems.map((item, idx) => (
        <button
          key={`mobile-${idx}`}
          onClick={() => handleNavigation(item.link)}
          className="text-right px-4 py-3 rounded-xl text-gray-300 hover:text-pink-400 transition-all duration-300 font-medium text-lg bg-white/5 hover:bg-white/10"
        >
          {item.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Navbar className="relative">
        {/* Desktop Navigation */}
        <NavBody className="backdrop-blur-2xl bg-black/20 border border-white/10 shadow-2xl">
          <Logo />
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            {navItems.map((item, idx) => (
              <button
                key={`nav-${idx}`}
                onClick={() => handleNavigation(item.link)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-pink-400 transition-colors duration-300 rounded-xl"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleScrollToSection('contact')}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              رزرو نوبت
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="backdrop-blur-2xl bg-black/20 border border-white/10 shadow-2xl">
          <MobileNavHeader>
            <Logo />
            <MobileNavToggle
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </MobileNavHeader>
          
          <MobileNavMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            className="bg-black/80 backdrop-blur-xl border border-white/10"
          >
            <MobileNavItems />
            <button
              onClick={() => {
                handleScrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg mt-4"
            >
              رزرو نوبت
            </button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
} 