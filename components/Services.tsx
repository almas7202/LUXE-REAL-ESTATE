'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const services = [
  {
    title: 'Buy',
    desc: 'Access exclusive listings and off-market opportunities with agents who know every neighborhood.',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=85',
    cta: 'Start Your Search',
  },
  {
    title: 'Sell',
    desc: 'Get maximum value for your property with strategic pricing, premium marketing, and expert negotiation.',
    img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85',
    cta: 'Get Your Valuation',
  },
  {
    title: 'Invest',
    desc: 'From single properties to portfolio strategies — we identify opportunities that generate lasting wealth.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85',
    cta: 'Explore Returns',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.svc-heading',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-heading', start: 'top 80%' } }
    )

    gsap.fromTo('.svc-card',
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-cards', start: 'top 75%' }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#0a0a0f] py-32 px-8 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="svc-heading text-center mb-20">
          <p className="section-label mb-4">Our Services</p>
          <div className="gold-line mx-auto mb-8" />
          <h2 className="font-playfair text-[clamp(2.5rem,5vw,5rem)] font-bold text-white">
            Everything You <em className="text-gold not-italic">Need</em>
          </h2>
        </div>

        <div className="svc-cards grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="svc-card group relative overflow-hidden h-[520px] cursor-none">
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <h3 className="font-playfair text-5xl font-bold text-white mb-4">{s.title}</h3>
                <p className="font-inter text-white/60 text-sm leading-relaxed mb-6 max-w-[280px]">{s.desc}</p>
                <a
                  href="#"
                  className="inline-block px-6 py-3 border border-gold/60 text-gold text-xs font-inter tracking-widest uppercase group-hover:bg-gold group-hover:text-dark transition-all duration-400"
                >
                  {s.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
