import type { ImageKey } from './images';

/**
 * Sample news content for the public site. These are illustrative articles to
 * be replaced/extended via Admin → News (database-backed). Dates are examples.
 */
export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  cover: ImageKey;
  body: string[];
}

export const newsPosts: NewsPost[] = [
  {
    slug: 'uzbekistan-south-korea-labour-agreement-expanded',
    title: 'Uzbekistan and South Korea Expand Bilateral Labour Agreement',
    excerpt:
      'New quotas under the Employment Permit System open additional opportunities for skilled Uzbek workers in construction and manufacturing.',
    category: 'Regulatory',
    author: 'Specialist Group',
    date: '2026-05-18',
    cover: 'airport',
    body: [
      'The governments of Uzbekistan and the Republic of Korea have expanded their bilateral labour cooperation, increasing annual quotas for Uzbek workers under the Employment Permit System (EPS). The agreement reflects the growing reputation of Uzbek workers for reliability and skill.',
      'For international employers, the expanded framework means faster, more predictable deployment timelines and stronger legal protections for both parties. Specialist Group, as a licensed agency, is fully accredited to recruit and prepare candidates under the updated terms.',
      'Employers interested in recruiting under the expanded quotas are encouraged to submit their workforce requirements early, as demand for the new allocations is expected to be high.',
    ],
  },
  {
    slug: 'vocational-training-centre-partnership-tashkent',
    title: 'New Vocational Training Partnership Strengthens Pre-Deployment Readiness',
    excerpt:
      'A partnership with accredited Tashkent training centres adds capacity for welding, electrical and care-sector certification.',
    category: 'Training',
    author: 'Specialist Group',
    date: '2026-04-02',
    cover: 'training',
    body: [
      'Specialist Group has formalised a partnership with leading vocational training centres in Tashkent to expand pre-deployment preparation for international placements. The collaboration increases certified capacity across welding, electrical trades and the care sector.',
      'Workers now complete role-specific, internationally aligned training before deployment — meaning employers receive candidates who are productive from day one and meet destination-country safety standards.',
      'The investment underlines our commitment to quality over volume: every worker we deploy should succeed, and every employer should receive exactly the capability they were promised.',
    ],
  },
  {
    slug: 'ethical-recruitment-zero-fee-commitment',
    title: 'Reaffirming Our Zero-Fee Commitment to Workers',
    excerpt:
      'Specialist Group restates its adherence to international fair-recruitment principles: no recruitment fees are ever charged to workers.',
    category: 'Compliance',
    author: 'Specialist Group',
    date: '2026-02-20',
    cover: 'compliance',
    body: [
      'Ethical recruitment is not a slogan — it is the foundation of a sustainable industry. Specialist Group reaffirms its commitment to the “Employer Pays” principle: workers are never charged recruitment fees.',
      'This approach protects workers from debt bondage and exploitation, and it gives employers confidence that their workforce arrives free of coercive financial arrangements. Our contracts are transparent and bilingual, reviewed before any deployment.',
      'We believe responsible recruitment is also good business: it builds trust, reduces turnover and strengthens long-term partnerships.',
    ],
  },
  {
    slug: 'specialist-group-milestone-twelve-thousand-placements',
    title: 'Specialist Group Surpasses 12,000 Successful International Placements',
    excerpt:
      'A milestone reflecting nearly a decade of compliant recruitment and lasting employer partnerships across 18 countries.',
    category: 'Company',
    author: 'Specialist Group',
    date: '2026-01-15',
    cover: 'team',
    body: [
      'Specialist Group has surpassed 12,000 successful international placements since its founding — a milestone that reflects the trust employers and workers alike place in our process.',
      'From a single Tashkent office to partnerships across 18 destination countries, our growth has been built on one principle: do recruitment lawfully and well, and the results follow.',
      'We thank our partner employers, our team and the thousands of workers who have built new futures abroad through Specialist Group.',
    ],
  },
];

export function getNewsPost(slug: string): NewsPost | undefined {
  return newsPosts.find((p) => p.slug === slug);
}
