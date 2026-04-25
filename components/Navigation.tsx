'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo('.nav-item',
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 1.2 }
    )
  }, { scope: navRef })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = ['Properties', 'Services', 'About', 'Agents', 'Contact']

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-gold/10 py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="nav-item">
          <span className="font-playfair text-2xl font-bold tracking-widest text-white">
            LUXE<span className="text-gold">.</span>
          </span>
        </div>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l} className="nav-item">
              <a
                href="#"
                className="text-sm font-inter font-medium tracking-widest uppercase text-white/70 hover:text-gold transition-colors duration-300"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="nav-item hidden md:block">
          <a
            href="#"
            className="px-6 py-2.5 border border-gold/60 text-gold text-xs font-inter font-medium tracking-widest uppercase hover:bg-gold hover:text-dark transition-all duration-400"
          >
            Book a Call
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden nav-item flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-px bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${menuOpen ? 'max-h-96 py-8' : 'max-h-0'}`}>
        <ul className="flex flex-col items-center gap-8">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="text-sm font-inter tracking-widest uppercase text-white/70 hover:text-gold transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
