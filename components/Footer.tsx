'use client'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-white/5 py-20 px-8 md:px-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-playfair text-3xl font-bold text-white mb-4">
              LUXE<span className="text-gold">.</span>
            </div>
            <p className="font-inter text-sm text-white/40 leading-relaxed mb-6">
              Premium real estate. Expert agents. Real guidance.
            </p>
            <div className="gold-line" />
          </div>

          {[
            {
              title: 'Properties',
              links: ['Featured Listings', 'Luxury Homes', 'New Developments', 'Commercial', 'Off-Market'],
            },
            {
              title: 'Company',
              links: ['About Us', 'Our Agents', 'Careers', 'Press', 'Contact'],
            },
            {
              title: 'Services',
              links: ['Buy a Home', 'Sell a Home', 'Invest', 'Property Management', 'Mortgage'],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-inter font-medium tracking-widest uppercase text-gold mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm font-inter text-white/40 hover:text-white transition-colors duration-300">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-inter text-white/30">
            &copy; 2024 LUXE Realty. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
              <a key={l} href="#" className="text-xs font-inter text-white/30 hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
