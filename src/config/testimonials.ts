/**
 * Sample testimonial content for the public site. These are illustrative and
 * should be replaced with verified client quotes (the Admin → Testimonials
 * module manages the live, database-backed set). Names/companies are examples.
 */
export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  country: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Specialist Group delivered 40 construction workers to our Seoul project on schedule and fully documented. Their compliance process gave us complete confidence — this is how international recruitment should work.',
    authorName: 'Min-jun Park',
    authorTitle: 'HR Director',
    company: 'Hanwoo Construction',
    country: 'South Korea',
    rating: 5,
  },
  {
    id: 't2',
    quote:
      'We needed skilled welders and the candidates arrived already trained and safety-certified. The language preparation made integration seamless. A genuinely professional partner.',
    authorName: 'Stefan Weber',
    authorTitle: 'Operations Manager',
    company: 'Weber Industrietechnik',
    country: 'Germany',
    rating: 5,
  },
  {
    id: 't3',
    quote:
      'The transparency around licensing and contracts is what won us over. Every worker was legally documented, and the post-arrival support has been excellent.',
    authorName: 'Aisha Al-Mansouri',
    authorTitle: 'Procurement Lead',
    company: 'Gulf Hospitality Group',
    country: 'United Arab Emirates',
    rating: 5,
  },
  {
    id: 't4',
    quote:
      'Reliable, responsive and ethical. Specialist Group has become our primary recruitment partner for agricultural seasonal workers across two seasons now.',
    authorName: 'Tomasz Kowalski',
    authorTitle: 'Farm Operations Director',
    company: 'AgroPol Sp. z o.o.',
    country: 'Poland',
    rating: 5,
  },
  {
    id: 't5',
    quote:
      'The nurses and caregivers we received were well-prepared and compassionate. The screening quality is clearly higher than agencies we have used before.',
    authorName: 'Yuki Tanaka',
    authorTitle: 'Facility Administrator',
    company: 'Sakura Care Homes',
    country: 'Japan',
    rating: 5,
  },
  {
    id: 't6',
    quote:
      'From the first request to deployment took under ten weeks. Clear communication throughout and a dedicated account manager who actually answered the phone.',
    authorName: 'James Whitfield',
    authorTitle: 'Site Director',
    company: 'Whitfield Contractors',
    country: 'United Kingdom',
    rating: 5,
  },
];
