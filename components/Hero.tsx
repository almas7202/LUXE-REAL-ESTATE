'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const headline = 'Find What Moves You'
const subWords = ['Expert', 'agents.', 'Real', 'guidance.', 'A', 'clear', 'path', 'forward.']

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const imageRef   = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {

    // ── ENTRANCE TIMELINE ─────────────────────────────────────────────
    const enter = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Image wipes in from right (clip-path reveal)
    enter.fromTo(imageRef.current,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 50%)', duration: 1.4, ease: 'power4.inOut' },
      0
    )

    // Left panel: label → gold line → chars → sub → buttons
    enter
      .fromTo('.hero-label',   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5)
      .fromTo('.hero-gline',   { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0.8)
      .fromTo('.hero-char',    { y: '110%', opacity: 0, rotateX: -40 },
                               { y: '0%', opacity: 1, rotateX: 0, duration: 1, stagger: 0.032, ease: 'power4.out' }, 1.0)
      .fromTo('.hero-sw',      { y: '100%', opacity: 0 },
                               { y: '0%', opacity: 1, duration: 0.7, stagger: 0.055, ease: 'power3.out' }, 1.6)
      .fromTo('.hero-btn',     { y: 22, opacity: 0, scale: 0.9 },
                               { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }, 1.9)
      .fromTo('.hero-stat',    { y: 30, opacity: 0 },
                               { y: 0, opacity: 1, duration: 0.5, stagger: 0.09, ease: 'power3.out' }, 2.0)
      .fromTo('.hero-scroll-dot', { opacity: 0, y: 10 },
                               { opacity: 1, y: 0, duration: 0.5 }, 2.2)

    // ── SCROLL EXPANSION ─────────────────────────────────────────────
    // Image expands from right-half → full screen, text fades out,
    // overlay text reveals on top.
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    })

    // Expand clip-path: inset(0% 0% 0% 50%) → inset(0% 0% 0% 0%)
    scrollTl.to(imageRef.current,
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' },
      0
    )

    // Left text slides left + fades (first 40% of scroll)
    scrollTl.to(leftRef.current,
      { x: -80, opacity: 0, duration: 0.4, ease: 'power2.in' },
      0
    )

    // Inner image subtle Ken Burns
    scrollTl.to('.hero-img-inner',
      { scale: 1.08, duration: 1, ease: 'none' },
      0
    )

    // Dark overlay on image lifts (more visible image on expand)
    scrollTl.to('.img-dark-overlay',
      { opacity: 0.2, duration: 0.5, ease: 'none' },
      0
    )

    // Left-edge blend gradient fades (no longer needed when full screen)
    scrollTl.to('.img-left-blend',
      { opacity: 0, duration: 0.3, ease: 'none' },
      0
    )

    // Overlay text rises in after 60% of scroll
    scrollTl.fromTo(overlayRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      0.62
    )

    // Stats bar fades out when image fully expands
    scrollTl.to('.hero-stat',
      { opacity: 0, duration: 0.3 },
      0.7
    )

  }, { scope: heroRef })

  // ── MOUSE PARALLAX ────────────────────────────────────────────────
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to('.hero-img-inner', { x: x * 18, y: y * 10, duration: 1.6, ease: 'power2.out' })
      gsap.to('.hero-char',      { x: x * -7, duration: 1.2, ease: 'power2.out' })
    }
    hero.addEventListener('mousemove', move)
    return () => hero.removeEventListener('mousemove', move)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]"
    >

      {/* ═══ LEFT PANEL — text ═══════════════════════════════════════ */}
      <div
        ref={leftRef}
        className="absolute left-0 top-0 h-full z-20 flex flex-col justify-center"
        style={{ width: '50%', paddingLeft: 'clamp(2rem, 6vw, 6rem)', paddingRight: '3rem' }}
      >
        {/* Label */}
        <div className="hero-label flex items-center gap-3 mb-7" style={{ opacity: 0 }}>
          <span className="block w-8 h-px bg-gold" />
          <span className="section-label">Premium Real Estate</span>
        </div>

        {/* Gold line */}
        <div
          className="hero-gline w-14 h-0.5 bg-gradient-to-r from-gold to-gold-light mb-7"
          style={{ transform: 'scaleX(0)' }}
        />

        {/* Headline — per-character split */}
        <h1
          className="font-playfair font-bold text-white leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(2.6rem, 5vw, 5.8rem)', perspective: '900px' }}
          aria-label={headline}
        >
          {headline.split(' ').map((word, wi) => (
            <span
              key={wi}
              style={{ display: 'inline-block', marginRight: '0.2em', marginBottom: '0.04em' }}
            >
              {word.split('').map((char, ci) => (
                <span key={ci} className="char-wrap">
                  <span
                    className="hero-char inline-block"
                    style={{ color: word === 'Moves' ? '#c9a96e' : undefined }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subheading — per-word reveal */}
        <p
          className="font-inter text-white/60 leading-relaxed mb-10"
          style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', maxWidth: '380px' }}
        >
          {subWords.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.28em' }}
            >
              <span className="hero-sw inline-block">{word}</span>
            </span>
          ))}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href="#"
            className="hero-btn px-8 py-4 bg-gold text-dark text-[11px] font-inter font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            Find Properties
          </a>
          <a
            href="#"
            className="hero-btn px-8 py-4 border border-white/20 text-white text-[11px] font-inter tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-all duration-300"
            style={{ opacity: 0 }}
          >
            Our Services
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-dot flex items-center gap-4" style={{ opacity: 0 }}>
          <div className="relative w-5 h-8 border border-white/25 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-gold rounded-full animate-bounce" />
          </div>
          <span className="text-white/30 text-[10px] font-inter tracking-[0.28em] uppercase">Scroll to Explore</span>
        </div>
      </div>

      {/* ═══ RIGHT IMAGE PANEL ═══════════════════════════════════════ */}
      {/* Full viewport size, clip-path restricts to right half on load */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: 'inset(0% 100% 0% 0%)', zIndex: 10 }}
      >
        {/* The actual image */}
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=95"
          alt="Luxury estate"
          className="hero-img-inner w-full h-full object-cover"
        />

        {/* Dark overlay — lifts on scroll expand */}
        <div
          className="img-dark-overlay absolute inset-0"
          style={{ background: 'rgba(10,10,15,0.48)' }}
        />

        {/* Left-edge blend — merges image into dark text background */}
        <div
          className="img-left-blend absolute inset-y-0 left-0 pointer-events-none"
          style={{
            width: '30%',
            background: 'linear-gradient(to right, #0a0a0f 15%, rgba(10,10,15,0.6) 60%, transparent 100%)',
          }}
        />

        {/* ── Overlay text (appears when image is full screen) ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-8"
          style={{ opacity: 0 }}
        >
          {/* Backdrop blur card */}
          <div
            className="backdrop-blur-sm px-14 py-14 max-w-[640px] w-full"
            style={{ background: 'rgba(10,10,15,0.45)', border: '1px solid rgba(201,169,110,0.15)' }}
          >
            <p className="section-label mb-5">Discover More</p>

            <div
              className="w-14 h-px mx-auto mb-7"
              style={{ background: 'linear-gradient(to right, transparent, #c9a96e, transparent)' }}
            />

            <h2
              className="font-playfair font-bold text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 4rem)' }}
            >
              The Home You<br />
              <em className="not-italic text-gold">Deserve Exists</em>
            </h2>

            <p
              className="font-inter text-white/60 leading-relaxed mb-8 mx-auto"
              style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', maxWidth: '420px' }}
            >
              Our curated portfolio of premium properties gives you access to homes
              that match not just your budget — but your life.
            </p>

            <a
              href="#"
              className="inline-block px-10 py-4 bg-gold text-dark text-[11px] font-inter font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-300"
            >
              Explore Listings
            </a>
          </div>
        </div>
      </div>

      {/* ═══ Bottom stats bar ═══════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#0a0a0f]/90 backdrop-blur-md border-t border-white/5 hidden md:flex">
        {[
          { num: '2,400+', label: 'Properties Sold' },
          { num: '98%',    label: 'Client Satisfaction' },
          { num: '15+',    label: 'Years of Excellence' },
          { num: '$2.8B',  label: 'Total Sales Volume' },
        ].map((s, i) => (
          <div
            key={i}
            className="hero-stat flex-1 py-5 px-8 border-r border-white/5 last:border-r-0 hover:bg-white/2 transition-colors duration-300"
            style={{ opacity: 0 }}
          >
            <div className="font-playfair text-2xl font-bold text-gold">{s.num}</div>
            <div className="text-[10px] font-inter text-white/35 tracking-[0.2em] uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}
