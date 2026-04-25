'use client'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const testimonials = [
  {
    quote: 'LUXE didn\'t just find us a house — they found us our forever home. The process was seamless, the communication was impeccable.',
    name: 'Sarah & James Morrison',
    role: 'Purchased in Malibu, 2024',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=85',
  },
  {
    quote: 'In 20 years of buying properties, I\'ve never worked with a team this professional. They knew the market cold and negotiated brilliantly.',
    name: 'Richard Chen',
    role: 'Investor, Purchased 3 Properties',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=85',
  },
  {
    quote: 'From our first call to closing day, every detail was handled with care. LUXE turned what could have been stressful into something truly enjoyable.',
    name: 'Alexandra Wells',
    role: 'Purchased in Beverly Hills, 2023',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=200&q=85',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(() => {
    gsap.fromTo('.test-heading',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.test-heading', start: 'top 80%' } }
    )

    gsap.fromTo('.test-card',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.test-card', start: 'top 80%' } }
    )
  }, { scope: sectionRef })

  const switchTo = (i: number) => {
    gsap.to('.test-quote-text', {
      opacity: 0, y: 10, duration: 0.3,
      onComplete: () => {
        setActive(i)
        gsap.to('.test-quote-text', { opacity: 1, y: 0, duration: 0.4 })
      }
    })
  }

  return (
    <section ref={sectionRef} className="bg-[#111118] py-32 px-8 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="test-heading mb-20 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-4">Client Stories</p>
            <div className="gold-line mb-6" />
            <h2 className="font-playfair text-[clamp(2.5rem,5vw,5rem)] font-bold text-white">
              What They <em className="text-gold not-italic">Say</em>
            </h2>
          </div>
        </div>

        {/* Large quote */}
        <div className="mb-16 border border-white/5 p-12 md:p-20">
          <div className="text-gold font-playfair text-8xl leading-none mb-6 opacity-40">&ldquo;</div>
          <p className="test-quote-text font-playfair text-[clamp(1.3rem,2.5vw,2rem)] text-white/90 leading-relaxed italic mb-10">
            {testimonials[active].quote}
          </p>
          <div className="flex items-center gap-4">
            <img
              src={testimonials[active].img}
              alt={testimonials[active].name}
              className="w-14 h-14 rounded-full object-cover border border-gold/30"
            />
            <div>
              <div className="font-playfair font-semibold text-white">{testimonials[active].name}</div>
              <div className="text-xs font-inter text-white/40 tracking-widest uppercase mt-1">{testimonials[active].role}</div>
            </div>
          </div>
        </div>

        {/* Selector dots */}
        <div className="flex gap-4 justify-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className={`w-12 h-px transition-all duration-300 ${i === active ? 'bg-gold' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
