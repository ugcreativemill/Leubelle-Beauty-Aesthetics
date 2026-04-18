import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About Us', href: '/#about' },
  { label: 'Treatments', href: '/#services' },
  { label: 'Experience', href: '/#featured' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact Us', href: '/#contact' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/30 bg-ivory/90 shadow-soft backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="/" className="flex items-center gap-3">
          <div className="rounded-[1.5rem] border border-bronze/10 bg-white/88 p-2 shadow-soft">
            <img
              src="/leubelle-logo.png"
              alt="Leubelle Beauty & Aesthetics logo"
              className="h-16 w-16 object-contain object-center sm:h-20 sm:w-20"
            />
          </div>
          <div>
            <p className="font-brand text-xl uppercase tracking-[0.26em] text-bronze sm:text-2xl">
              Leubelle
            </p>
            <p className="text-[0.58rem] uppercase tracking-[0.38em] text-ink/45">
              Beauty &amp; Aesthetics
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink/78 transition hover:text-mocha"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://leubelle.booksy.com/a/"
            className="rounded-full bg-mocha px-6 py-3 text-sm font-semibold text-white transition hover:bg-bronze"
          >
            Book On Booksy
          </a>
        </div>

        <button
          type="button"
          className="rounded-full border border-mocha/15 bg-white/80 p-3 text-mocha lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-mocha/10 bg-ivory/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-ink/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://leubelle.booksy.com/a/"
              className="rounded-full bg-mocha px-6 py-3 text-center text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Book On Booksy
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
