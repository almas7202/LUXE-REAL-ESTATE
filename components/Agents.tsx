'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const agents = [
  {
    name: 'Michael Torres',
    role: 'Luxury Property Specialist',
    sales: '$420M in Sales',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=90',
    areas: 'Beverly Hills · Bel Air',
  },
  {
    name: 'Sophia Reynolds',
    role: 'Senior Real Estate Advisor',
    sales: '$310M in Sales',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=90',
    areas: 'Malibu · Santa Monica',
  },
  {
    name: 'James Whitfield',
    role: 'Investment Property Expert',
    sales: '$580M in Sales',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=90',
    areas: 'Hollywood Hills · Calabasas',
  },
  {
    name: 'Amara Chen',
    role: "Buyer's Agent Specialist",
    sales: '$280M in Sales',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=90',
    areas: 'Laguna Beach · Newport Beach',
  },
]

export default function Agents() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.agent-char',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out',
        scrollTrigger: { trigger: '.agent-heading', start: 'top 80%' } }
    )

    gsap.utils.toArray<HTMLElement>('.agent-card').forEach((card) => {
      // Image clip-path reveal
      gsap.fromTo(card.querySelector('.agent-img'),
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut',
          scrollTrigger: { trigger: card, start: 'top 82%' } }
      )
      // Info slides up
      gsap.fromTo(card.querySelector('.agent-info'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: card, start: 'top 82%' } }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#0a0a0f] py-32 px-8 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="agent-heading mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Our Team</span>
            </div>
            <h2 className="font-playfair font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              {'Meet the '.split('').map((char, i) => (
                <span key={i} className="char-wrap">
                  <span className="agent-char inline-block">{char === ' ' ? ' ' : char}</span>
                </span>
              ))}
              {'Experts'.split('').map((char, i) => (
                <span key={i + 9} className="char-wrap">
                  <span className="agent-char inline-block text-gold">{char}</span>
                </span>
              ))}
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-3 text-sm font-inter text-gold hover-line">
            View All Agents →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((a, i) => (
            <div key={i} className="agent-card group cursor-none">
              {/* Image */}
              <div className="relative h-[360px] overflow-hidden mb-6">
                <img
                  src={a.img}
                  alt={a.name}
                  className="agent-img w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-xs font-inter text-gold tracking-widest uppercase">{a.sales}</div>
                </div>
              </div>
              {/* Info */}
              <div className="agent-info" style={{ opacity: 0 }}>
                <h3 className="font-playfair text-xl font-semibold text-white mb-1">{a.name}</h3>
                <p className="text-xs font-inter text-gold/80 mb-2">{a.role}</p>
                <p className="text-xs font-inter text-white/35 tracking-widest">{a.areas}</p>
                <div className="mt-4 w-8 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
