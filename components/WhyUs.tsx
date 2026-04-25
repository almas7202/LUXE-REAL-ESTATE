'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const features = [
  {
    num: '01',
    title: 'Expert Local Agents',
    desc: 'Our agents have deep roots in the communities they serve — delivering insider knowledge, market expertise, and genuine care for your outcome.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=90',
  },
  {
    num: '02',
    title: 'Clear Guidance',
    desc: 'No surprises. We walk you through every document, every decision, and every detail with complete transparency from day one.',
    img: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=90',
  },
  {
    num: '03',
    title: 'Premium Access',
    desc: 'Gain access to exclusive off-market properties and curated luxury listings that never reach the public market.',
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=600&q=90',
  },
  {
    num: '04',
    title: 'Concierge Service',
    desc: "From first showing through closing and beyond, we remain your trusted partner — handling every detail so you don't have to.",
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=90',
  },
]

const titleWords = ['Real', 'Estate', 'Done', 'Differently']

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.why-label',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.why-label', start: 'top 85%' } }
    )

    gsap.fromTo('.why-char',
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power4.out',
        scrollTrigger: { trigger: '.why-title', start: 'top 80%' } }
    )

    gsap.utils.toArray<HTMLElement>('.why-card').forEach((card) => {
      gsap.fromTo(card,
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%' } }
      )
      const img = card.querySelector('.why-card-img')
      if (img) {
        gsap.fromTo(img,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut',
            scrollTrigger: { trigger: card, start: 'top 82%' } }
        )
      }
    })

    ScrollTrigger.create({
      trigger: '.why-stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.stat-num').forEach((el) => {
          const target = parseFloat(el.getAttribute('data-target') || '0')
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target, duration: 2.2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() },
          })
        })
      },
    })

    gsap.fromTo('.why-gold-line',
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.why-gold-line', start: 'top 88%' } }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#0a0a0f] py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-20">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-10">
          <div className="max-w-[680px]">
            <div className="why-label flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
              <span className="w-8 h-px bg-gold" />
              <span className="section-label">Why Choose LUXE</span>
            </div>
            <div className="why-gold-line w-12 h-0.5 bg-gradient-to-r from-gold to-gold-light mb-8" style={{ transform: 'scaleX(0)' }} />
            {/* Word-by-word split — spaces handled by marginRight, not char-wrap overflow */}
            <h2 className="why-title font-playfair font-bold text-white leading-tight" style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)' }}>
              {titleWords.map((word, wi, arr) => (
                <span key={wi} style={{ display: 'inline-block', marginRight: wi < arr.length - 1 ? '0.22em' : 0 }}>
                  {word.split('').map((char, ci) => (
                    <span key={ci} className="char-wrap">
                      <span className="why-char inline-block" style={{ color: wi === 3 ? '#c9a96e' : undefined }}>
                        {char}
                      </span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
          </div>
          <p className="font-inter text-white/50 text-base leading-relaxed max-w-[340px]">
            We believe that finding your next home should feel like the beginning of something extraordinary — not a transaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 mb-px">
          {features.map((f, i) => (
            <div key={i} className="why-card group bg-[#0a0a0f] hover:bg-[#0f0f16] transition-colors duration-500 overflow-hidden cursor-none">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  className="why-card-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
              </div>
              <div className="p-8">
                <div className="font-playfair text-5xl font-bold text-white/10 mb-3">{f.num}</div>
                <h3 className="font-playfair text-xl font-semibold text-white mb-3">{f.title}</h3>
                <div className="w-8 h-px bg-gold mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <p className="font-inter text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why-stats grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {[
            { num: 2400, label: 'Properties Sold', suffix: '+' },
            { num: 98, label: 'Satisfaction Rate', suffix: '%' },
            { num: 15, label: 'Years in Business', suffix: '+' },
            { num: 850, label: 'Happy Families', suffix: '+' },
          ].map((s, i) => (
            <div key={i} className="bg-[#0a0a0f] p-10 text-center group hover:bg-[#0f0f16] transition-colors duration-300">
              <div className="font-playfair text-5xl font-bold text-gold mb-2">
                <span className="stat-num" data-target={s.num}>0</span>{s.suffix}
              </div>
              <div className="text-xs font-inter text-white/35 tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
