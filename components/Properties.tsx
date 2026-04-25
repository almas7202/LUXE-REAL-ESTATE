'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const properties = [
  {
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=95',
    price: '$4,250,000',
    name: 'Azure Sky Penthouse',
    location: 'Beverly Hills, CA',
    beds: 4, baths: 5, sqft: '6,200',
    tag: 'Featured',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=95',
    price: '$2,875,000',
    name: 'The White Manor',
    location: 'Santa Monica, CA',
    beds: 5, baths: 6, sqft: '5,100',
    tag: 'New',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=95',
    price: '$3,650,000',
    name: 'Marble Ridge Estate',
    location: 'Malibu, CA',
    beds: 6, baths: 7, sqft: '7,400',
    tag: 'Exclusive',
  },
  {
    img: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=95',
    price: '$1,980,000',
    name: 'Hillcrest Villa',
    location: 'Hollywood Hills, CA',
    beds: 3, baths: 4, sqft: '3,800',
    tag: 'Featured',
  },
  {
    img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=95',
    price: '$5,100,000',
    name: 'Ocean View Crown',
    location: 'Laguna Beach, CA',
    beds: 5, baths: 6, sqft: '8,200',
    tag: 'Off-Market',
  },
  {
    img: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=95',
    price: '$3,100,000',
    name: 'Sunset Ridge Home',
    location: 'Bel Air, CA',
    beds: 5, baths: 5, sqft: '6,800',
    tag: 'New',
  },
]

export default function Properties() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Heading char split
    gsap.fromTo('.prop-char',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out',
        scrollTrigger: { trigger: '.prop-heading', start: 'top 80%' } }
    )

    gsap.fromTo('.prop-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5,
        scrollTrigger: { trigger: '.prop-heading', start: 'top 80%' } }
    )

    // Horizontal scroll
    const track = trackRef.current
    if (!track) return

    const getX = () => -(track.scrollWidth - window.innerWidth + 160)

    const scrollTween = gsap.to(track, {
      x: getX,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Each card: clip-path reveal as it enters horizontal view
    gsap.utils.toArray<HTMLElement>('.prop-card').forEach((card) => {
      gsap.fromTo(card.querySelector('.prop-img'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power4.inOut',
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: card,
            start: 'left 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(card.querySelector('.prop-info'),
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: card,
            start: 'left 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#111118] overflow-hidden">
      {/* Header */}
      <div className="prop-heading max-w-[1400px] mx-auto px-8 md:px-20 pt-32 pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-6 prop-sub" style={{ opacity: 0 }}>
            <span className="w-8 h-px bg-gold" />
            <span className="section-label">Curated Collection</span>
          </div>
          {/* Word-by-word split — spaces handled by marginRight, not collapsed char-wrap */}
          <h2 className="font-playfair font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}>
            {['Featured', 'Properties'].map((word, wi) => (
              <span key={wi} style={{ display: 'inline-block', marginRight: wi === 0 ? '0.22em' : 0 }}>
                {word.split('').map((char, ci) => (
                  <span key={ci} className="char-wrap">
                    <span className="prop-char inline-block" style={{ color: wi === 1 ? '#c9a96e' : undefined }}>
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>
        <a href="#" className="prop-sub hidden md:inline-flex items-center gap-3 text-sm font-inter text-gold hover-line" style={{ opacity: 0 }}>
          View All Listings
          <span className="text-lg">→</span>
        </a>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex gap-5 px-8 md:px-20 pb-24" style={{ width: 'max-content' }}>
        {properties.map((p, i) => (
          <div key={i} className="prop-card flex-shrink-0 w-[350px] md:w-[400px] bg-[#0a0a0f] overflow-hidden group cursor-none">
            <div className="relative h-[270px] overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="prop-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ clipPath: 'inset(0% 100% 0% 0%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 px-3 py-1.5 bg-gold text-dark text-[10px] font-inter font-bold tracking-[0.2em] uppercase">
                {p.tag}
              </div>
              <div className="absolute bottom-5 left-5">
                <div className="font-playfair text-2xl font-bold text-white">{p.price}</div>
              </div>
            </div>
            <div className="prop-info p-7" style={{ opacity: 0 }}>
              <h3 className="font-playfair text-xl font-semibold text-white mb-1">{p.name}</h3>
              <p className="text-xs font-inter text-white/40 mb-5 flex items-center gap-2">
                <span className="text-gold">◎</span> {p.location}
              </p>
              <div className="flex gap-5 text-xs font-inter text-white/40 uppercase tracking-widest border-t border-white/5 pt-5">
                <span>{p.beds} Beds</span>
                <span>·</span>
                <span>{p.baths} Baths</span>
                <span>·</span>
                <span>{p.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
