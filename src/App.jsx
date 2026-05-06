import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Instagram,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { SectionHeading } from './components/SectionHeading';
import { featuredTreatments, services, servicesBySlug } from './data/services';

const BOOKSY_URL =
  'https://booksy.com/en-za/43159_leubelle-beauty-aesthetics_skin-care_54464_strathavon?do=invite&_branch_match_id=1573995465181752854&utm_medium=profile_share_from_profile&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVD%2FAoskwM8iwzMUiyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAN98KkT0AAAA%3D';

const floatingPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    className:
      'left-[-1.4rem] top-[8rem] h-24 w-20 sm:left-[-0.8rem] sm:top-[8.5rem] sm:h-32 sm:w-24 md:left-[-1.4rem] md:top-[9.5rem] md:h-40 md:w-32 lg:left-[-2rem] lg:top-[10rem] lg:h-52 lg:w-40',
    imageClassName: 'opacity-38 sm:opacity-48 md:opacity-58',
    duration: 13,
    delay: 0.15,
    rotate: -8,
    driftX: 10,
    driftY: 16
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    className:
      'left-[4%] top-[17rem] h-24 w-20 sm:left-[6%] sm:top-[19rem] sm:h-32 sm:w-24 md:left-[4%] md:top-[22rem] md:h-40 md:w-32 lg:left-[6%] lg:top-[26rem] lg:h-52 lg:w-40',
    imageClassName: 'opacity-34 sm:opacity-44 md:opacity-55',
    duration: 11,
    delay: 0.45,
    rotate: 7,
    driftX: 8,
    driftY: 14
  },
  {
    src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    className:
      'right-[-1rem] top-[6rem] h-24 w-20 sm:right-[1%] sm:top-[7rem] sm:h-32 sm:w-24 md:right-[2%] md:top-[8rem] md:h-40 md:w-32 lg:right-[5%] lg:top-[8rem] lg:h-52 lg:w-40',
    imageClassName: 'opacity-34 sm:opacity-44 md:opacity-55',
    duration: 14,
    delay: 0.2,
    rotate: 8,
    driftX: 12,
    driftY: 18
  },
  {
    src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80',
    className:
      'right-[2%] top-[18rem] h-24 w-20 sm:right-[5%] sm:top-[21rem] sm:h-32 sm:w-24 md:right-[3%] md:top-[24rem] md:h-40 md:w-32 lg:right-[10%] lg:top-[28rem] lg:h-52 lg:w-40',
    imageClassName: 'opacity-32 sm:opacity-42 md:opacity-54',
    duration: 12,
    delay: 0.6,
    rotate: -7,
    driftX: 9,
    driftY: 15
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    className:
      'left-[38%] top-[4.5rem] h-24 w-20 sm:left-[42%] sm:top-[4.5rem] sm:h-32 sm:w-24 md:left-[44%] md:top-[5.5rem] md:h-40 md:w-32 lg:left-[46%] lg:top-[6rem] lg:h-52 lg:w-40',
    imageClassName: 'opacity-24 sm:opacity-30 md:opacity-42',
    duration: 15,
    delay: 0.3,
    rotate: 5,
    driftX: 7,
    driftY: 12
  }
];

const trustPoints = [
  'Personalized consultations guided by your skin goals',
  'Modern treatment techniques with a luxury touch',
  'Professional, hygienic, and beautifully calming surroundings',
  'Tailored plans focused on confidence and consistency',
  'A client-centered experience that feels attentive from start to finish',
  'Visible care, thoughtful advice, and polished aftercare support'
];

const testimonials = [
  {
    quote:
      'Leubelle made me feel looked after from the moment I walked in. My skin looked refreshed, smooth, and beautifully radiant.',
    name: 'Amanda K.',
    title: 'Hydrafacial Client'
  },
  {
    quote:
      'The consultation was detailed, professional, and reassuring. I loved how calm the studio felt and how tailored the treatment was.',
    name: 'Lerato M.',
    title: 'Skin Rejuvenation Client'
  },
  {
    quote:
      'Luxury without feeling intimidating. Every detail felt intentional, and the results left me feeling confident and glowing.',
    name: 'Nokuthula S.',
    title: 'Laser Hair Removal Client'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' }
  })
};

function DecorativeLine() {
  return (
    <svg
      viewBox="0 0 300 480"
      className="h-full w-full text-bronze/30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M222 34c-48 27-77 79-75 131 2 50 34 76 18 132-11 39-44 76-90 103"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M243 18c13 16 21 39 21 61 0 43-23 81-56 111-31 29-53 68-57 110"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArchShape({ className = '' }) {
  return (
    <div
      className={`rounded-t-[12rem] rounded-b-[2rem] bg-stone/85 ${className}`}
      aria-hidden="true"
    />
  );
}

function FloatingPhoto({
  src,
  alt,
  className = '',
  imageClassName = '',
  duration = 12,
  delay = 0,
  rotate = 0,
  driftX = 8,
  driftY = 14
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden rounded-[2rem] border border-white/40 bg-white/35 shadow-luxe backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 20, rotate }}
      animate={{
        opacity: [0.16, 0.28, 0.16],
        x: [0, driftX, 0],
        y: [0, -driftY, 0],
        rotate: [rotate, rotate + 1.5, rotate]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover saturate-[0.85] ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,246,240,0.18),rgba(251,246,240,0.5))]" />
    </motion.div>
  );
}

function WhatsAppIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.05 4.94A9.77 9.77 0 0 0 12.08 2C6.68 2 2.29 6.4 2.29 11.8c0 1.73.45 3.42 1.32 4.9L2 22l5.42-1.58a9.72 9.72 0 0 0 4.65 1.18h.01c5.39 0 9.79-4.4 9.79-9.8 0-2.62-1.02-5.08-2.82-6.86Zm-6.97 15.01h-.01a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.21.94.95-3.13-.2-.32a8.11 8.11 0 0 1-1.25-4.33c0-4.48 3.65-8.13 8.14-8.13 2.17 0 4.21.84 5.74 2.38a8.06 8.06 0 0 1 2.38 5.75c0 4.48-3.65 8.12-8.12 8.12Zm4.46-6.08c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.63-1.17-1.41-1.31-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.8-.19-.46-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 1.99 0 1.17.86 2.31.98 2.47.12.16 1.69 2.58 4.09 3.62.57.24 1.01.38 1.36.49.57.18 1.08.15 1.49.09.45-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function Preloader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeOut' } }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-[linear-gradient(180deg,#fdfaf6_0%,#fbf6f0_100%)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative flex flex-col items-center"
        >
          <div className="relative rounded-t-[8rem] rounded-b-[2rem] bg-stone/80 px-10 pb-8 pt-10 shadow-luxe">
            <motion.div
              className="absolute inset-0 rounded-t-[8rem] rounded-b-[2rem] border border-bronze/10"
              animate={{ opacity: [0.45, 0.85, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img
              src="/leubelle-logo.png"
              alt="Leubelle Beauty & Aesthetics logo"
              className="relative z-10 h-28 w-28 object-contain"
            />
          </div>
          <p className="mt-8 font-brand text-3xl uppercase tracking-[0.3em] text-bronze">
            Leubelle
          </p>
          <p className="mt-2 text-[0.68rem] uppercase tracking-[0.42em] text-ink/45">
            Beauty &amp; Aesthetics
          </p>
          <motion.div
            className="mt-7 h-[2px] w-32 overflow-hidden rounded-full bg-bronze/12"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-full w-16 rounded-full bg-bronze"
              animate={{ x: [-52, 68, -52] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="border-t border-mocha/8 bg-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] lg:px-10">
        <div>
          <div className="inline-flex rounded-[2rem] border border-bronze/10 bg-white/88 p-3 shadow-soft">
            <img
              src="/leubelle-logo.png"
              alt="Leubelle Beauty & Aesthetics logo"
              className="h-28 w-28 object-contain"
            />
          </div>
          <p className="mt-5 font-brand text-3xl uppercase tracking-[0.28em] text-bronze">
            Leubelle
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-ink/45">
            Beauty &amp; Aesthetics
          </p>
          <p className="mt-3 font-script text-4xl leading-none text-ink">Skin + Body Specialists</p>
          <p className="mt-6 max-w-sm text-sm leading-7 text-ink/68">
            Luxury skin and body treatments designed to feel calm, polished, and beautifully
            tailored for every client.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-mocha">Quick Links</p>
          <div className="mt-5 space-y-3 text-sm text-ink/68">
            {[
              ['About Us', '/#about'],
              ['Treatments', '/#services'],
              ['Experience', '/#featured'],
              ['Testimonials', '/#testimonials'],
              ['Contact Us', '/#contact']
            ].map(([label, href]) => (
              <a key={label} href={href} className="block transition hover:text-mocha">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-mocha">Services</p>
          <div className="mt-5 space-y-3 text-sm text-ink/68">
            {services.slice(0, 4).map((service) => (
              <a
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block transition hover:text-mocha"
              >
                {service.name}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-mocha">Contact Us</p>
          <div className="mt-5 space-y-3">
            {[
              {
                icon: MapPin,
                label: 'Location',
                value: 'Sandton, Johannesburg',
                href: '/#contact'
              },
              {
                icon: PhoneCall,
                label: 'Phone',
                value: '+27 82 082 6761',
                href: 'tel:+27820826761'
              },
              {
                icon: WhatsAppIcon,
                label: 'WhatsApp',
                value: 'WhatsApp Us',
                href: 'https://wa.me/27820826761'
              },
              {
                icon: Instagram,
                label: 'Instagram',
                value: '@leubelle_aesthetics_sa',
                href: 'https://www.instagram.com/leubelle_aesthetics_sa?igsh=MTdpbm1vdjBtb3R6Zg%3D%3D'
              }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 rounded-[1.4rem] bg-white/88 p-4 text-sm text-ink/68 shadow-soft transition hover:-translate-y-0.5 hover:text-mocha"
                >
                  <div className="rounded-2xl bg-sand p-3 text-bronze">
                    <Icon className="h-[17px] w-[17px]" size={17} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-ink/40">
                      {item.label}
                    </p>
                    <p className="mt-1 font-medium text-mocha">{item.value}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-t border-mocha/8 px-5 py-6 text-center text-xs uppercase tracking-[0.28em] text-ink/45">
        Copyright 2026 Leubelle Beauty &amp; Aesthetics. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <motion.a
        href="https://wa.me/27820826761"
        aria-label="WhatsApp"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-mocha text-white shadow-luxe transition hover:bg-bronze"
        animate={{
          y: [0, -6, 0],
          boxShadow: [
            '0 25px 80px rgba(91, 59, 45, 0.12)',
            '0 30px 90px rgba(160, 106, 51, 0.2)',
            '0 25px 80px rgba(91, 59, 45, 0.12)'
          ]
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </motion.a>

      <motion.a
        href={BOOKSY_URL}
        aria-label="Booksy"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-bronze/12 bg-white/92 text-bronze shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-bronze/25 hover:bg-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
      >
        <CalendarDays size={24} />
      </motion.a>
    </div>
  );
}

function PricePreview({ service }) {
  if (!service.priceItems?.length) {
    return null;
  }

  return (
    <div className="mt-6 rounded-[1.4rem] border border-bronze/10 bg-white/78 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-bronze/75">
          Price Guide
        </p>
        <p className="rounded-full bg-sand px-3 py-1 font-serif text-lg font-semibold leading-none text-mocha">
          From {service.startingPrice}
        </p>
      </div>
      <div className="mt-4 space-y-2">
        {service.priceItems.slice(0, 2).map((item) => (
          <div key={`${service.slug}-${item.label}`} className="flex items-start justify-between gap-3">
            <span className="text-xs leading-5 text-ink/58">{item.label}</span>
            <span className="shrink-0 text-xs font-semibold text-mocha">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriceMenu({ service }) {
  if (!service.priceItems?.length) {
    return null;
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-[2.1rem] border border-bronze/10 bg-gradient-to-br from-ivory via-white to-sand/80 p-6 shadow-soft">
      <div className="absolute right-[-3rem] top-[-3rem] h-32 w-32 rounded-full border border-bronze/10" />
      <div className="relative z-10 flex flex-col gap-3 border-b border-mocha/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-bronze/80">
            Price List
          </p>
          <h3 className="mt-2 font-serif text-4xl leading-none text-mocha">Treatment Pricing</h3>
        </div>
        <p className="w-fit rounded-full bg-mocha px-4 py-2 font-serif text-xl font-semibold text-white shadow-soft">
          From {service.startingPrice}
        </p>
      </div>
      <div className="relative z-10 mt-5 grid gap-3">
        {service.priceItems.map((item) => (
          <div
            key={`${service.slug}-${item.label}`}
            className="grid gap-2 rounded-[1.25rem] border border-white/70 bg-white/82 p-4 shadow-soft sm:grid-cols-[1fr_auto] sm:items-center"
          >
            <p className="text-sm font-semibold leading-6 text-ink/74">{item.label}</p>
            <p className="font-serif text-2xl font-semibold leading-none text-mocha">{item.price}</p>
          </div>
        ))}
      </div>
      <p className="relative z-10 mt-5 text-xs leading-6 text-ink/50">
        Rand prices may be confirmed during consultation. Consultation items are quoted after skin assessment.
      </p>
    </div>
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.04 }}
      whileHover={{ y: -6 }}
      className="group flex h-full flex-col rounded-[2rem] border border-mocha/8 bg-ivory p-7 shadow-soft transition hover:shadow-luxe"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sand text-bronze">
          <Sparkles size={20} />
        </div>
        <span className="text-[0.68rem] uppercase tracking-[0.28em] text-bronze/80">
          {service.category}
        </span>
      </div>
      <h3 className="mt-6 font-serif text-3xl text-mocha">{service.name}</h3>
      <p className="mt-4 text-sm leading-7 text-ink/68">{service.description}</p>
      <PricePreview service={service} />
      <a
        href={`/services/${service.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-mocha transition group-hover:text-bronze"
      >
        View Treatment
        <ArrowRight size={15} />
      </a>
    </motion.article>
  );
}

function HomePage() {
  return (
    <>
      <main className="overflow-hidden">
        <section className="relative isolate bg-hero-glow pt-28 sm:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_35%)]" />
          <motion.div
            className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-blush/50 blur-3xl"
            animate={{ y: [0, -16, 0], opacity: [0.45, 0.65, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-24 top-40 hidden h-56 w-56 rounded-full bg-sand/40 blur-3xl lg:block"
            animate={{ y: [0, 18, 0], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <ArchShape className="absolute left-[8%] top-20 hidden h-[32rem] w-[18rem] opacity-50 lg:block" />
          {floatingPhotos.map((photo) => (
            <FloatingPhoto key={photo.src + photo.className} alt="" {...photo} />
          ))}
          <div className="absolute right-0 top-16 hidden h-[32rem] w-[20rem] lg:block">
            <DecorativeLine />
          </div>

          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-24">
            <div className="relative z-10">
              <motion.p
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mb-6 inline-flex rounded-full border border-bronze/15 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-bronze shadow-soft"
              >
                Skin + Body Specialists
              </motion.p>
              <motion.h1
                custom={0.1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="max-w-3xl font-serif text-5xl leading-[0.95] text-mocha sm:text-6xl lg:text-7xl"
              >
                Luxury Skin &amp; Body Treatments
                <span className="mt-2 block font-brand text-3xl uppercase tracking-[0.32em] text-bronze sm:text-4xl">
                  Tailored To You
                </span>
              </motion.h1>
              <motion.p
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-6 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl"
              >
                Leubelle Beauty &amp; Aesthetics offers elevated skin and body treatments
                designed around your features, your comfort, and the results-focused care
                you deserve.
              </motion.p>

              <motion.div
                custom={0.3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href={BOOKSY_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-mocha px-7 py-4 text-sm font-semibold text-white shadow-luxe transition hover:bg-bronze"
                >
                  Book On Booksy
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-mocha/15 bg-white/80 px-7 py-4 text-sm font-semibold text-mocha transition hover:border-bronze/40 hover:bg-white"
                >
                  Explore Treatments
                </a>
              </motion.div>
              <motion.p
                custom={0.34}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-4 text-sm text-ink/55"
              >
                Secure online booking via Booksy.
              </motion.p>

              <motion.div
                custom={0.4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <div className="inline-flex items-center gap-4 rounded-[2rem] border border-bronze/10 bg-white/88 p-4 shadow-luxe backdrop-blur-xl">
                  <div className="rounded-[1.5rem] bg-ivory p-3 shadow-soft">
                    <img
                      src="/leubelle-logo.png"
                      alt="Leubelle Beauty & Aesthetics logo"
                      className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                    />
                  </div>
                  <div>
                    <p className="font-brand text-lg uppercase tracking-[0.32em] text-bronze sm:text-xl">
                      Leubelle
                    </p>
                    <p className="mt-1 text-[0.7rem] uppercase tracking-[0.42em] text-ink/45 sm:text-xs">
                      Beauty &amp; Aesthetics
                    </p>
                    <p className="mt-3 font-script text-4xl leading-none text-ink sm:text-5xl">
                      Skin + Body Specialists
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                custom={0.5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-14 grid gap-4 rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-luxe backdrop-blur-xl sm:grid-cols-3"
              >
                {[
                  ['Skin-first luxury', 'Premium facials, laser, and advanced skin rituals'],
                  ['Personalized approach', 'Consultative, Unisex, and carefully tailored'],
                  ['Sandton studio', 'A calm modern space with soft, elevated comfort']
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[1.5rem] bg-ivory/80 p-4">
                    <p className="font-serif text-2xl text-mocha">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-ink/65">{copy}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut', delay: 0.25 }}
              className="relative flex items-end"
            >
              <motion.div
                className="relative ml-auto w-full max-w-[34rem] overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/60 p-4 shadow-luxe backdrop-blur-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArchShape className="absolute inset-x-10 top-5 h-[76%]" />
                <div className="grid gap-4 sm:grid-cols-[1fr_0.78fr]">
                  <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem]">
                    <img
                      src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80"
                      alt="Luxury skincare treatment"
                      className="h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-6 text-white">
                      <p className="font-brand text-xs uppercase tracking-[0.35em] text-white/80">
                        Premium Care
                      </p>
                      <p className="mt-2 font-serif text-3xl">
                        Advanced skin rituals with a gentle touch.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="rounded-[2rem] bg-sand p-5">
                      <p className="font-script text-5xl leading-none text-ink">
                        Skin + Body Specialists
                      </p>
                      <p className="mt-2 text-sm leading-7 text-ink/70">
                        The logo&apos;s soft femininity translated into a calm, polished studio
                        experience designed around confidence and care.
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-[2rem]">
                      <img
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80"
                        alt="Beauty portrait"
                        className="h-52 w-full object-cover"
                      />
                    </div>
                    <div className="rounded-[2rem] bg-white p-5 shadow-soft">
                      <div className="flex items-center gap-3 text-mocha">
                        <Sparkles size={18} />
                        <p className="font-brand text-sm uppercase tracking-[0.28em]">
                          Signature Finish
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-ink/68">
                        Each experience is designed to leave you feeling polished, refreshed,
                        and beautifully cared for.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-sand/70 p-4 shadow-luxe">
              <ArchShape className="absolute inset-x-8 top-5 h-[82%]" />
              <div className="absolute -left-14 top-12 h-36 w-36 rounded-full bg-white/60 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
                alt="Leubelle consultation"
                className="relative h-[34rem] w-full rounded-[2rem] object-cover"
              />
            </div>

            <div>
              <SectionHeading
                eyebrow="About Us"
                title="Where Beauty Meets Expertise"
                description="At Leubelle Beauty & Aesthetics, every appointment is shaped around refined care, skin-focused knowledge, and the quiet confidence that comes from feeling seen, supported, and beautifully looked after."
              />
              <div className="mt-8 space-y-6 text-base leading-8 text-ink/72 sm:text-lg">
                <p>
                  We specialize in luxury skin and body treatments for clients who want more
                  than a routine appointment. From advanced facials to laser and targeted skin
                  services, our approach blends modern techniques with a warm, personalized
                  touch.
                </p>
                <p>
                  Every treatment journey begins with understanding your goals, your skin, and
                  the experience you want to have. The result is a studio visit that feels
                  elevated, Unisex, and deeply attentive.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {['Personalized care', 'Luxury treatment flow', 'Results-driven mindset'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-bronze/20 bg-white px-5 py-3 text-sm font-medium text-mocha shadow-soft"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white/70 py-24">
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Our Services"
              title="A Real Treatment Menu Designed Around Leubelle Care"
              description="Explore the full Leubelle service offering. Each treatment has its own page so clients can understand the focus, feel, and luxury experience before booking."
              align="center"
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.slug} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-8 rounded-[2.75rem] bg-gradient-to-br from-sand via-ivory to-blush p-8 shadow-luxe lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
            <div>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="An Elevated Aesthetic Experience, Thoughtfully Delivered"
                description="Luxury is not only how your treatment looks. It is how carefully you are welcomed, guided, and cared for throughout your journey."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft"
                >
                  <ShieldCheck className="text-bronze" size={20} />
                  <p className="mt-4 text-sm leading-7 text-ink/72">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="featured" className="bg-white/80 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Featured Treatments"
              title="Explore Signature Leubelle Experiences"
              description="A closer look at a few of our most in-demand services, each delivered with calm professionalism and a polished luxury feel."
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              {featuredTreatments.map((item, index) => (
                <motion.article
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="overflow-hidden rounded-[2.2rem] border border-mocha/8 bg-ivory shadow-luxe"
                >
                  <div className="grid md:grid-cols-[0.95fr_1.05fr]">
                    <img
                      src={item.heroImage}
                      alt={item.name}
                      className="h-full min-h-72 w-full object-cover"
                    />
                    <div className="flex flex-col justify-between p-7">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-bronze/80">
                          {item.category}
                        </p>
                        <h3 className="mt-3 font-serif text-4xl text-mocha">{item.name}</h3>
                        <p className="mt-4 text-sm leading-7 text-ink/68">{item.overview}</p>
                        {item.startingPrice ? (
                          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-bronze/10 bg-white/82 px-4 py-2 shadow-soft">
                            <span className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-bronze/75">
                              From
                            </span>
                            <span className="font-serif text-xl font-semibold text-mocha">
                              {item.startingPrice}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <a
                        href={`/services/${item.slug}`}
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mocha"
                      >
                        View treatment page
                        <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Results & Experience"
                title="Radiance, Confidence, And Intentional Self-Care"
                description="Our treatments are designed to support healthier-looking skin, a polished appearance, and the personal confidence that grows when you make space for yourself."
              />
              <div className="mt-8 space-y-5 text-base leading-8 text-ink/72">
                <p>
                  We focus on thoughtful skincare journeys that help you feel renewed, refined,
                  and cared for. Whether you are preparing for an event, maintaining your glow,
                  or beginning a new skin chapter, we create an experience that feels calm and
                  considered from beginning to end.
                </p>
                <p>
                  Every visit is a moment to reconnect with your confidence and invest in
                  elevated beauty rituals that fit your lifestyle.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Refined glow', 'Fresh, polished-looking skin with a luxurious finish'],
                ['Comfort-first care', 'A soothing studio atmosphere with attentive guidance'],
                ['Tailored support', 'Recommendations shaped around your needs and treatment goals'],
                ['Beautiful consistency', 'A premium routine that feels sustainable and indulgent']
              ].map(([title, copy]) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-mocha/8 bg-white p-6 shadow-soft"
                >
                  <Star className="text-bronze" size={18} />
                  <h3 className="mt-5 font-serif text-3xl text-mocha">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/68">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-gradient-to-b from-white to-sand/60 py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <SectionHeading
              eyebrow="Client Love"
              title="Trusted By Clients Who Value Beautiful Care"
              description="A premium aesthetics experience should feel reassuring, polished, and worth returning to. Our clients come for the treatments and stay for the feeling."
              align="center"
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[2rem] border border-white/70 bg-white/90 p-7 shadow-soft"
                >
                  <div className="flex gap-1 text-bronze">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-6 text-base leading-8 text-ink/74">"{testimonial.quote}"</p>
                  <div className="mt-8 border-t border-mocha/10 pt-5">
                    <p className="font-semibold text-mocha">{testimonial.name}</p>
                    <p className="text-sm text-ink/55">{testimonial.title}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="booking" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.8rem] bg-mocha px-7 py-12 text-white shadow-luxe sm:px-10 lg:px-14">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 left-8 h-48 w-48 rounded-full bg-bronze/30 blur-3xl" />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Booking Invitation
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
                  Ready to Begin Your Skin Journey?
                </h2>
                <p className="mt-3 font-brand text-sm uppercase tracking-[0.38em] text-white/60">
                  Leubelle Beauty &amp; Aesthetics
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  Book your Leubelle appointment instantly on Booksy, or send us a quick
                  WhatsApp message for guidance on the right service.
                </p>
                <p className="mt-4 text-sm text-white/60">Secure online booking via Booksy.</p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={BOOKSY_URL}
                  className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold text-mocha transition hover:bg-sand"
                >
                  Book On Booksy
                </a>
                <a
                  href="https://wa.me/27820826761"
                  className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  WhatsApp Inquiry
                </a>
                <a
                  href="tel:+27820826761"
                  className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white/80 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10">
            <div className="rounded-[2.4rem] bg-ivory p-8 shadow-luxe">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-bronze/80">
                Contact Us
              </p>
              <h2 className="mt-4 font-serif text-4xl text-mocha sm:text-5xl">
                Book Your Appointment With Leubelle Today
              </h2>
              <p className="mt-5 text-base leading-8 text-ink/72">
                Discover premium skincare and aesthetic treatments in the heart of Sandton. Book
                instantly on Booksy, or message us on WhatsApp if you need help choosing the
                right treatment first.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  [MapPin, 'Location', 'Sandton, Johannesburg, South Africa'],
                  [PhoneCall, 'Phone / WhatsApp', '+27 82 082 6761'],
                  [Clock3, 'Business Hours', 'Mon - Sat: 9:00 AM - 6:00 PM'],
                  [Instagram, 'Instagram', '@leubelle_aesthetics_sa']
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-start gap-4 rounded-[1.5rem] bg-white p-5 shadow-soft">
                    <div className="rounded-2xl bg-sand p-3 text-bronze">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-ink/45">{label}</p>
                      <p className="mt-2 text-sm font-medium text-mocha">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.4rem] border border-mocha/8 bg-white shadow-luxe">
              <iframe
                title="Leubelle Beauty & Aesthetics map"
                src="https://www.google.com/maps?q=Sandton%20Johannesburg&z=13&output=embed"
                className="h-80 w-full border-0 sm:h-[28rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="grid gap-5 p-8 sm:grid-cols-3">
                <a
                  href={BOOKSY_URL}
                  className="rounded-full bg-mocha px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-bronze"
                >
                  Book On Booksy
                </a>
                <a
                  href="https://wa.me/27820826761"
                  className="rounded-full border border-mocha/12 px-5 py-4 text-center text-sm font-semibold text-mocha transition hover:bg-sand/40"
                >
                  WhatsApp Inquiry
                </a>
                <a
                  href="tel:+27820826761"
                  className="rounded-full border border-mocha/12 px-5 py-4 text-center text-sm font-semibold text-mocha transition hover:bg-sand/40"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function ServiceDetailPage({ service }) {
  return (
    <>
      <main className="overflow-hidden pt-24">
        <section className="relative isolate bg-hero-glow py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_35%)]" />
          <ArchShape className="absolute left-[10%] top-8 hidden h-[28rem] w-[16rem] opacity-45 lg:block" />
          <div className="absolute right-0 top-8 hidden h-[28rem] w-[18rem] lg:block">
            <DecorativeLine />
          </div>

          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10">
            <div className="relative z-10">
              <a
                href="/#services"
                className="inline-flex items-center gap-2 rounded-full border border-bronze/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-bronze shadow-soft"
              >
                <ArrowLeft size={14} />
                Back To Services
              </a>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-bronze/80"
              >
                {service.category}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
                className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-mocha sm:text-6xl"
              >
                {service.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                className="mt-6 max-w-2xl text-lg leading-8 text-ink/72 sm:text-xl"
              >
                {service.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                className="mt-10 flex flex-col gap-4 sm:flex-row"
              >
                <a
                  href={BOOKSY_URL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-mocha px-7 py-4 text-sm font-semibold text-white shadow-luxe transition hover:bg-bronze"
                >
                  Book On Booksy
                  <ArrowRight size={16} />
                </a>
                <a
                  href="tel:+27820826761"
                  className="inline-flex items-center justify-center rounded-full border border-mocha/15 bg-white/80 px-7 py-4 text-sm font-semibold text-mocha transition hover:border-bronze/40 hover:bg-white"
                >
                  Call For Consultation
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/65 p-4 shadow-luxe backdrop-blur-xl">
                <ArchShape className="absolute inset-x-10 top-6 h-[78%]" />
                <img
                  src={service.heroImage}
                  alt={service.name}
                  className="relative h-[34rem] w-full rounded-[2rem] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2.4rem] bg-white p-8 shadow-luxe">
              <SectionHeading
                eyebrow="Treatment Overview"
                title={`About ${service.name}`}
                description={service.overview}
              />
              <div className="mt-8 rounded-[2rem] bg-sand/60 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-bronze/80">
                  The Leubelle Experience
                </p>
                <p className="mt-4 text-base leading-8 text-ink/72">{service.journey}</p>
              </div>
              <PriceMenu service={service} />
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2.4rem] bg-gradient-to-br from-sand via-ivory to-blush p-8 shadow-luxe">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-bronze/80">
                  Ideal For
                </p>
                <div className="mt-6 space-y-4">
                  {service.idealFor.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.5rem] border border-white/60 bg-white/80 p-4 text-sm leading-7 text-ink/72 shadow-soft"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.4rem] bg-ivory p-8 shadow-luxe">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-bronze/80">
                  Why Clients Choose It
                </p>
                <div className="mt-6 space-y-4">
                  {service.benefits.map((item) => (
                    <div key={item} className="flex gap-4 rounded-[1.5rem] bg-white p-4 shadow-soft">
                      <Sparkles className="mt-1 text-bronze" size={18} />
                      <p className="text-sm leading-7 text-ink/72">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <div className="overflow-hidden rounded-[2.8rem] bg-mocha px-7 py-12 text-white shadow-luxe sm:px-10 lg:px-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Ready To Book
                </p>
                <h2 className="mt-4 max-w-2xl font-serif text-4xl sm:text-5xl">
                  Interested in {service.name}?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  Book this treatment directly on Booksy, or reach out on WhatsApp if you would
                  like help before confirming your appointment.
                </p>
                <p className="mt-4 text-sm text-white/60">Secure online booking via Booksy.</p>
              </div>
              <div className="flex flex-col gap-4">
                <a
                  href={BOOKSY_URL}
                  className="rounded-full bg-white px-7 py-4 text-center text-sm font-semibold text-mocha transition hover:bg-sand"
                >
                  Book On Booksy
                </a>
                <a
                  href="https://wa.me/27820826761"
                  className="rounded-full border border-white/20 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <main className="mx-auto max-w-4xl px-5 py-32 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-bronze/80">
          Treatment Not Found
        </p>
        <h1 className="mt-4 font-serif text-5xl text-mocha sm:text-6xl">Let&apos;s head back home.</h1>
        <p className="mt-6 text-lg leading-8 text-ink/72">
          The page you tried to open does not exist yet, but the Leubelle treatment menu is
          waiting for you on the homepage.
        </p>
        <a
          href="/#services"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-mocha px-7 py-4 text-sm font-semibold text-white shadow-luxe transition hover:bg-bronze"
        >
          Back To Services
          <ArrowRight size={16} />
        </a>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const pathname = window.location.pathname;
  const serviceMatch = pathname.match(/^\/services\/([^/]+)\/?$/);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowPreloader(false), 1800);
    document.body.classList.add('preloading');

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove('preloading');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('preloading', showPreloader);
    return () => document.body.classList.remove('preloading');
  }, [showPreloader]);

  if (serviceMatch) {
    const service = servicesBySlug[serviceMatch[1]];

    return (
      <div id="top" className="bg-ivory text-ink">
        {showPreloader ? <Preloader /> : null}
        <Navbar />
        {service ? <ServiceDetailPage service={service} /> : <NotFoundPage />}
      </div>
    );
  }

  return (
    <div id="top" className="bg-ivory text-ink">
      {showPreloader ? <Preloader /> : null}
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
