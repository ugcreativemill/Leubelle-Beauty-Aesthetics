import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-2xl ${alignment}`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-bronze/80">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-none text-mocha sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-ink/70 sm:text-lg">{description}</p>
    </motion.div>
  );
}
