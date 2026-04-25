'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const images = [
  { src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=90', span: 'row-span-2', label: 'Interiors' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90', span: '', label: 'Kitchens' },
  { src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=90', span: '', label: 'Outdoors' },
  { src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=90', span: '', label: 'Bedrooms' },
  { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=90', span: '', label: 'Living Spaces' },
  { src: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=90', span: 'row-span-2', label: 'Architecture' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading
    gsap.fromTo('.gal-char',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.025, ease: 'power4.out',
        scrollTrigger: { trigger: '.gal-heading', start: 'top 80%' } }
    )

    // Each image: clip-path reveal from bottom
    gsap.utils.toArray<HTMLElement>('.gal-img').forEach((img, i) => {
      gsap.fromTo(img,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power4.inOut',
          delay: (i % 3) * 0.1,
          scrollTrigger: { trigger: img, start: 'top 82%' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#111118] py-32 px-8 md:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="gal-heading mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Lifestyle</span>
            </div>
            <h2 className="font-playfair font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              {'Life Inside'.split('').map((char, i) => (
                <span key={i} className="char-wrap">
                  <span className="gal-char inline-block">{char === ' ' ? ' ' : char}</span>
                </span>
              ))}
              {' '}
              {'Luxury'.split('').map((char, i) => (
                <span key={i} className="char-wrap">
                  <span className="gal-char inline-block text-gold">{char}</span>
                </span>
              ))}
            </h2>
          </div>
          <p className="font-inter text-white/45 text-sm leading-relaxed max-w-[300px]">
            Every home we represent tells a story. Here are some of the spaces that have moved our clients.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[700px]">
          {images.map((img, i) => (
            <div key={i} className={`relative overflow-hidden group cursor-none ${img.span}`}>
              <img
                src={img.src}
                alt={img.label}
                className="gal-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <span className="text-xs font-inter text-white/80 tracking-widest uppercase">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
