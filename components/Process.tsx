'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  {
    num: '01',
    title: 'Talk',
    sub: 'We start by listening',
    desc: "Understanding your needs, your timeline, and your vision is the foundation of everything we do. There's no agenda — just a genuine conversation about what you're looking for and where you want to go.",
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=95',
  },
  {
    num: '02',
    title: 'Clarity',
    sub: 'We bring the picture into focus',
    desc: "We present tailored options, clear market data, and honest guidance — no pressure, no jargon. Just the right information at the right time so you can make a decision with full confidence.",
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=95',
  },
  {
    num: '03',
    title: 'Move Forward',
    sub: 'We handle every detail',
    desc: "When you're ready, we handle every step of the transaction with precision and care. From offer to closing, our team ensures a seamless experience — and we remain your partner long after the keys are in your hand.",
    img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=95',
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.proc-char',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out',
        scrollTrigger: { trigger: '.proc-heading', start: 'top 80%' } }
    )

    gsap.utils.toArray<HTMLElement>('.proc-step').forEach((step, i) => {
      const isEven = i % 2 === 1

      // Image clip-path reveal (from right or left)
      gsap.fromTo(step.querySelector('.proc-img'),
        { clipPath: isEven ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: step, start: 'top 78%' },
        }
      )

      // Text slides from opposite side
      gsap.fromTo(step.querySelector('.proc-text'),
        { x: isEven ? -60 : 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: step, start: 'top 78%' },
        }
      )
    })

    // Vertical line draw
    gsap.fromTo('.proc-vline',
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1, duration: 2, ease: 'none',
        scrollTrigger: { trigger: '.proc-steps', start: 'top 80%', end: 'bottom 80%', scrub: 1 },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#0a0a0f] py-32 px-8 md:px-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="proc-heading text-center mb-24">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="section-label">How It Works</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-playfair font-bold text-white" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}>
            {['The', 'LUXE', 'Process'].map((word, wi, arr) => (
              <span key={wi} style={{ display: 'inline-block', marginRight: wi < arr.length - 1 ? '0.22em' : 0 }}>
                {word.split('').map((char, ci) => (
                  <span key={ci} className="char-wrap">
                    <span className="proc-char inline-block" style={{ color: wi === 2 ? '#c9a96e' : undefined }}>
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        <div className="proc-steps relative">
          <div className="proc-vline absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/20 to-transparent hidden md:block" style={{ transform: 'scaleY(0)' }} />

          <div className="flex flex-col gap-28">
            {steps.map((s, i) => (
              <div key={i} className={`proc-step flex flex-col md:flex-row items-center gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className="flex-1 relative overflow-hidden h-[380px]">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="proc-img w-full h-full object-cover"
                    style={{ clipPath: i % 2 === 1 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />
                </div>

                {/* Text */}
                <div className="proc-text flex-1 md:px-10" style={{ opacity: 0 }}>
                  <div className="font-playfair text-8xl font-bold text-gold/15 mb-4 leading-none">{s.num}</div>
                  <p className="section-label mb-3">{s.sub}</p>
                  <h3 className="font-playfair text-5xl font-bold text-white mb-5">{s.title}</h3>
                  <div className="w-12 h-px bg-gradient-to-r from-gold to-gold-light mb-6" />
                  <p className="font-inter text-white/55 leading-relaxed text-base">{s.desc}</p>
                  <a href="#" className="inline-flex items-center gap-3 mt-8 text-sm font-inter text-gold hover-line">
                    Learn More <span>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
