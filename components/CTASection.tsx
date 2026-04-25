'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.cta-content',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )

    // Parallax bg
    gsap.to('.cta-bg',
      {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative py-40 px-8 md:px-20 overflow-hidden flex items-center justify-center">
      <div className="cta-bg absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
          alt="Luxury estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0f]/80" />
      </div>

      <div className="relative z-10 text-center max-w-[700px]">
        <p className="cta-content section-label mb-6">Ready to Begin?</p>
        <div className="cta-content gold-line mx-auto mb-8" />
        <h2 className="cta-content font-playfair text-[clamp(2.5rem,6vw,6rem)] font-bold text-white leading-tight mb-8">
          Your Dream Home<br />
          <em className="text-gold not-italic">Awaits</em>
        </h2>
        <p className="cta-content font-inter text-white/60 text-lg leading-relaxed mb-12">
          Speak with one of our expert agents today and take the first step toward finding what moves you.
        </p>
        <div className="cta-content flex flex-wrap gap-4 justify-center">
          <a href="#" className="px-10 py-5 bg-gold text-dark text-sm font-inter font-semibold tracking-widest uppercase hover:bg-gold-light transition-all duration-300">
            Find Properties
          </a>
          <a href="#" className="px-10 py-5 border border-white/30 text-white text-sm font-inter tracking-widest uppercase hover:border-gold hover:text-gold transition-all duration-300">
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  )
}
