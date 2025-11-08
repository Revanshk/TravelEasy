import React from "react";

const Footer = () => (
  <footer className="bg-[var(--space-cadet)] text-white py-10 px-4 border-t border-[var(--rose-quartz)]" style={{ color: 'var(--isabelline)' }}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10" style={{ color: 'var(--isabelline)' }}>
      {/* Brand & Description */}
      <div>
        <h2 className="text-2xl font-black mb-2 tracking-widest" style={{ color: 'var(--pale-dogwood)' }}>
          Travel Easy
        </h2>
        <p className="text-sm mb-4 font-semibold" style={{ color: 'var(--isabelline)' }}>
          Effortless hotel search and booking. Find your perfect stay anywhere, anytime.
        </p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="transition-all duration-200 hover:scale-110" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} aria-label="Facebook">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.599 0 0 .6 0 1.326v21.348C0 23.4.599 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.142v3.24h-1.92c-1.505 0-1.797.716-1.797 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0"/></svg>
          </a>
          <a href="#" className="transition-all duration-200 hover:scale-110" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} aria-label="Twitter">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.556a9.82 9.82 0 0 1-2.828.775 4.932 4.932 0 0 0 2.164-2.724 9.864 9.864 0 0 1-3.13 1.196 4.916 4.916 0 0 0-8.373 4.482c-4.085-.205-7.702-2.164-10.125-5.144a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.214 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 0 1-2.224.084c.631 1.963 2.445 3.392 4.6 3.433a9.864 9.864 0 0 1-6.102 2.102c-.395 0-.787-.023-1.175-.068A13.945 13.945 0 0 0 7.548 21c9.142 0 14.307-7.721 14.307-14.416 0-.22-.005-.439-.015-.656A10.282 10.282 0 0 0 24 4.556z"/></svg>
          </a>
          <a href="#" className="transition-all duration-200 hover:scale-110" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} aria-label="Instagram">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.013 4.849.07 1.366.06 2.633.333 3.608 1.308.974.975 1.248 2.242 1.308 3.608.057 1.265.07 1.645.07 4.849s-.013 3.584-.07 4.849c-.06 1.366-.333 2.633-1.308 3.608-.975.974-2.242 1.248-3.608 1.308-1.265.057-1.645.07-4.849.07s-3.584-.013-4.849-.07c-1.366-.06-2.633-.334-3.608-1.308-.974-.975-1.248-2.242-1.308-3.608C2.176 15.646 2.163 15.266 2.163 12s.013-3.584.07-4.849c.06-1.365.334-2.632 1.308-3.607.975-.974 2.242-1.248 3.608-1.308C8.416 2.176 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.015 7.052.072c-1.59.073-2.985.34-4.083 1.437-1.098 1.098-1.365 2.492-1.437 4.083C.015 8.332 0 8.741 0 12c0 3.259.015 3.668.072 4.948.072 1.591.339 2.985 1.437 4.083 1.098 1.098 2.493 1.364 4.083 1.437C8.332 23.985 8.741 24 12 24c3.259 0 3.668-.015 4.948-.072 1.591-.073 2.985-.339 4.083-1.437 1.098-1.098 1.364-2.492 1.437-4.083.057-1.28.072-1.689.072-4.948 0-3.259-.015-3.668-.072-4.948-.073-1.591-.339-2.985-1.437-4.083-1.098-1.097-2.492-1.364-4.083-1.437C15.668.015 15.259 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
        </div>
      </div>
      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--pale-dogwood)' }}>Quick Links</h3>
        <ul className="space-y-2 text-[15px] font-semibold" style={{ color: 'var(--isabelline)' }}>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/">Home</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Search Hotels</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Popular Destinations</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Deals &amp; Offers</a></li>
        </ul>
      </div>
      {/* Resources */}
      <div>
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--pale-dogwood)' }}>Resources</h3>
        <ul className="space-y-2 text-[15px] font-semibold" style={{ color: 'var(--isabelline)' }}>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Help Center</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">FAQs</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Reviews</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Travel Blog</a></li>
        </ul>
      </div>
      {/* Company */}
      <div>
        <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--pale-dogwood)' }}>Company</h3>
        <ul className="space-y-2 text-[15px] font-semibold" style={{ color: 'var(--isabelline)' }}>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">About Us</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Careers</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Contact</a></li>
          <li><a className="transition-all duration-200 hover:opacity-100 hover:translate-x-1" style={{ color: 'var(--isabelline)' }} onMouseEnter={(e) => e.target.style.color = 'var(--pale-dogwood)'} onMouseLeave={(e) => e.target.style.color = 'var(--isabelline)'} href="/underCon">Terms &amp; Privacy</a></li>
        </ul>
      </div>
    </div>
    <div className="mt-12 text-center text-sm font-medium" style={{ color: 'var(--isabelline)' }}>
      &copy; {new Date().getFullYear()} Travel Easy. All rights reserved.
    </div>
  </footer>
);

export default Footer;
