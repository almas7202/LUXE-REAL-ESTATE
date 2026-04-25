'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const vidWords = ['We', "Don't", 'Just', 'Sell', 'Homes.']
const goldWords = ['We', 'Change', 'Lives.']

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Video zooms in as section enters, zooms out to 1 as you pass through
    gsap.fromTo(videoRef.current,
      { scale: 1.35 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    // Overlay fades from heavy to lighter as you enter
    gsap.fromTo(overlayRef.current,
      { opacity: 0.9 },
      {
        opacity: 0.55,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: true,
        },
      }
    )

    // Label + gold line
    gsap.fromTo('.vid-label',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.vid-label', start: 'top 75%' } }
    )

    // Headline line 1 — word by word reveal
    gsap.fromTo('.vid-word-1',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.vid-h2', start: 'top 78%' } }
    )

    // Headline line 2 — gold words, slightly delayed
    gsap.fromTo('.vid-word-2',
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out', delay: 0.3,
        scrollTrigger: { trigger: '.vid-h2', start: 'top 78%' } }
    )

    // Sub text and CTA
    gsap.fromTo('.vid-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.vid-sub', start: 'top 80%' } }
    )

    // Horizontal gold line grows outward from center
    gsap.fromTo('.vid-line',
      { scaleX: 0, transformOrigin: 'center' },
      { scaleX: 1, duration: 1, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.vid-line', start: 'top 80%' } }
    )

    // Pin the section and add parallax to inner content going up
    gsap.to('.vid-content',
      {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center justify-center">

      {/* Video — multiple sources for reliability */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: 'scale(1.35)' }}
      >
        <source
          src="https://videos.pexels.com/video-files/2018928/2018928-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3578721/3578721-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Fallback bg image if video fails */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=95)' }}
      />

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0f]" style={{ opacity: 0.9 }} />

      {/* Subtle gold vignette bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,169,110,0.08) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="vid-content relative z-10 text-center px-8 max-w-[900px]">

        {/* Label */}
        <div className="vid-label flex items-center justify-center gap-4 mb-8" style={{ opacity: 0 }}>
          <span className="w-12 h-px bg-gold/60" />
          <span className="section-label">Our Story</span>
          <span className="w-12 h-px bg-gold/60" />
        </div>

        {/* Gold line */}
        <div className="vid-line w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10" style={{ transform: 'scaleX(0)' }} />

        {/* Headline — split word by word, two lines */}
        <h2 className="vid-h2 font-playfair font-bold text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>
          {/* Line 1 */}
          <div className="overflow-hidden mb-2">
            {vidWords.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.2em' }}>
                <span className="vid-word-1 inline-block" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </div>
          {/* Line 2 — gold */}
          <div className="overflow-hidden">
            {goldWords.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.2em' }}>
                <span className="vid-word-2 inline-block text-gold" style={{ display: 'inline-block' }}>{word}</span>
              </span>
            ))}
          </div>
        </h2>

        {/* Sub text */}
        <p className="vid-sub font-inter text-white/55 leading-relaxed mx-auto mb-10" style={{ opacity: 0, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: '500px' }}>
          For over 15 years, we have helped thousands of families find the place they truly belong — and built relationships that last long after closing day.
        </p>

        {/* CTA */}
        <a
          href="#"
          className="vid-sub inline-block px-10 py-4 border border-white/25 text-white text-xs font-inter tracking-[0.2em] uppercase hover:bg-gold hover:border-gold hover:text-dark transition-all duration-400"
          style={{ opacity: 0 }}
        >
          Watch Our Story
        </a>
      </div>

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0f)' }}
      />
    </section>
  )
}
