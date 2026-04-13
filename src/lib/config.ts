export const SITE = {
  name: 'Bloom & Vow',
  tagline: 'Wedding florals & event design',
  url: 'https://bloomandvow.com',
  email: 'hello@bloomandvow.com',
  phone: '(864) 555-7291',
  location: 'Greenville, SC',
} as const

export const PACKAGES = [
  { name: 'Petite', price: 'From $1,500', description: 'Bridal bouquet, groom boutonniere, 2 bridesmaid bouquets, altar arrangement. Perfect for intimate ceremonies.', popular: false },
  { name: 'Garden', price: 'From $3,500', description: 'Everything in Petite + centerpieces (up to 10 tables), ceremony arch florals, aisle markers, welcome sign arrangement.', popular: true },
  { name: 'Estate', price: 'From $6,000', description: 'Full venue design — ceremony + reception. Custom installations, hanging arrangements, cocktail hour florals, cake flowers, all personal flowers.', popular: false },
]

export const ADD_ONS = [
  { name: 'Photography referral', description: 'Partnered with 3 local wedding photographers. We coordinate blooms + lighting for cohesive photos.', price: 'Free referral' },
  { name: 'Day-of coordination', description: 'We manage all vendor arrivals, timeline, and setup so you focus on getting married.', price: 'From $800' },
  { name: 'Rehearsal dinner florals', description: 'Table arrangements and entrance pieces for your rehearsal venue.', price: 'From $400' },
  { name: 'Welcome bags', description: 'Curated gift bags with local treats, notes, and a pressed flower from your wedding palette.', price: '$15/bag' },
  { name: 'Flower preservation', description: 'We press and frame blooms from your bouquet as a keepsake. Ready 4-6 weeks post-wedding.', price: 'From $250' },
  { name: 'Proposal setups', description: 'Intimate floral installation for proposals — arch, petal path, or garden setup at your chosen location.', price: 'From $500' },
]

export const FAQS = [
  { q: 'How far in advance should I book?', a: 'We recommend 8-12 months before your wedding date, especially for peak season (April-October). We take a limited number of weddings per weekend to give each couple our full attention.' },
  { q: 'Do you travel outside Greenville?', a: 'Yes! We serve the entire Upstate SC, Asheville NC, and north Georgia. Travel fees apply for venues over 45 minutes from Greenville.' },
  { q: 'Can I customize a package?', a: 'Absolutely. Our packages are starting points — we build every wedding around your vision, venue, and budget. The inquiry form helps us understand what you\'re dreaming up.' },
  { q: 'What flowers do you use?', a: 'We source locally when possible and supplement with premium wholesalers. We work with seasonal blooms — which means your flowers are at their most beautiful and most affordable.' },
  { q: 'Do you do non-wedding events?', a: 'Yes — corporate events, galas, showers, and milestone celebrations. Fill out the inquiry form and select your event type.' },
  { q: 'What happens to the flowers after the wedding?', a: 'Guests are welcome to take centerpieces home! We also offer flower preservation as an add-on — we\'ll press and frame pieces from your bouquet.' },
  { q: 'Do you set up and take down?', a: 'Yes, setup and teardown are included in all packages. We arrive early, handle everything, and clean up after the reception.' },
]

export const PORTFOLIO = [
  { image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', caption: 'Lush garden arch — The Cliffs at Glassy' },
  { image: 'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=600&q=80', caption: 'Blush + ivory bridal bouquet' },
  { image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', caption: 'Rustic barn reception — Greenbrier Farms' },
  { image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', caption: 'Romantic table centerpieces' },
  { image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=600&q=80', caption: 'Ceremony aisle with petal accents' },
  { image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', caption: 'Estate package — full venue design' },
  { image: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=600&q=80', caption: 'Hanging floral installation' },
  { image: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=600&q=80', caption: 'Intimate elopement arrangement' },
]
