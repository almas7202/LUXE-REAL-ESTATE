'use client'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import Properties from '@/components/Properties'
import Gallery from '@/components/Gallery'
import VideoSection from '@/components/VideoSection'
import Process from '@/components/Process'
import Agents from '@/components/Agents'
import Testimonials from '@/components/Testimonials'
import Services from '@/components/Services'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Navigation />
      <Hero />
      <WhyUs />
      <Properties />
      <Gallery />
      <VideoSection />
      <Process />
      <Agents />
      <Testimonials />
      <Services />
      <CTASection />
      <Footer />
    </main>
  )
}
