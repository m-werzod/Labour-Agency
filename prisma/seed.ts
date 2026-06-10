import { PrismaClient, type IndustryType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function tracking(year: number, suffix: string) {
  return `SG-${year}-${suffix}`;
}

async function main() {
  console.info('🌱 Seeding database…');

  // 1. Admin user
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? 'admin@specialistgroup.uz').toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe!2026';
  const adminHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: adminHash, role: 'ADMIN', isActive: true },
    create: { email: adminEmail, name: 'Administrator', role: 'ADMIN', passwordHash: adminHash },
  });
  console.info(`   ✓ Admin user: ${adminEmail}`);

  // 2. Demo employer + portal user
  const employer = await prisma.employer.upsert({
    where: { email: 'hr@hanwoo-construction.com' },
    update: {},
    create: {
      companyName: 'Hanwoo Construction',
      contactPerson: 'Min-jun Park',
      country: 'South Korea',
      city: 'Seoul',
      email: 'hr@hanwoo-construction.com',
      phone: '+82 2 1234 5678',
      industry: 'CONSTRUCTION',
      isVerified: true,
    },
  });

  const employerPassword = await bcrypt.hash('Employer!2026', 12);
  await prisma.user.upsert({
    where: { email: 'employer@hanwoo-construction.com' },
    update: { employerId: employer.id },
    create: {
      email: 'employer@hanwoo-construction.com',
      name: 'Min-jun Park',
      role: 'EMPLOYER',
      passwordHash: employerPassword,
      employerId: employer.id,
    },
  });
  console.info('   ✓ Demo employer + portal user: employer@hanwoo-construction.com / Employer!2026');

  // 3. Sample employer requests
  const requests: {
    suffix: string;
    industry: IndustryType;
    workersCount: number;
    status: 'NEW' | 'IN_REVIEW' | 'IN_PROGRESS' | 'FULFILLED';
    skills: string;
  }[] = [
    { suffix: 'A1B2C3', industry: 'CONSTRUCTION', workersCount: 40, status: 'IN_PROGRESS', skills: 'Experienced steel fixers and scaffolders with EU safety certification.' },
    { suffix: 'D4E5F6', industry: 'INDUSTRIAL', workersCount: 25, status: 'NEW', skills: 'CNC machine operators and assembly line workers.' },
    { suffix: 'G7H8J9', industry: 'HEALTHCARE', workersCount: 12, status: 'FULFILLED', skills: 'Registered nurses and elderly caregivers with conversational English.' },
  ];

  for (const r of requests) {
    await prisma.employerRequest.upsert({
      where: { trackingNumber: tracking(2026, r.suffix) },
      update: {},
      create: {
        trackingNumber: tracking(2026, r.suffix),
        status: r.status,
        companyName: employer.companyName,
        contactPerson: employer.contactPerson ?? 'Min-jun Park',
        country: employer.country,
        email: employer.email,
        phone: employer.phone ?? '+82 2 1234 5678',
        industry: r.industry,
        workersCount: r.workersCount,
        requiredSkills: r.skills,
        employerId: employer.id,
        locale: 'en',
      },
    });
  }
  console.info(`   ✓ ${requests.length} sample requests`);

  // 4. Sample candidates
  const candidates: { ref: string; first: string; last: string; industry: IndustryType; profession: string; exp: number; langs: string[] }[] = [
    { ref: 'CND-0001', first: 'Aziz', last: 'Karimov', industry: 'CONSTRUCTION', profession: 'Steel fixer', exp: 6, langs: ['Uzbek', 'Russian', 'English'] },
    { ref: 'CND-0002', first: 'Dilnoza', last: 'Yusupova', industry: 'HEALTHCARE', profession: 'Registered nurse', exp: 4, langs: ['Uzbek', 'Russian', 'English'] },
    { ref: 'CND-0003', first: 'Sardor', last: 'Rahimov', industry: 'TRADE', profession: 'Welder (MIG/TIG)', exp: 8, langs: ['Uzbek', 'Russian'] },
    { ref: 'CND-0004', first: 'Madina', last: 'Tursunova', industry: 'TEXTILE', profession: 'Industrial seamstress', exp: 5, langs: ['Uzbek', 'Korean'] },
    { ref: 'CND-0005', first: 'Jasur', last: 'Olimov', industry: 'INDUSTRIAL', profession: 'CNC operator', exp: 3, langs: ['Uzbek', 'Russian', 'German'] },
  ];

  for (const c of candidates) {
    await prisma.candidate.upsert({
      where: { reference: c.ref },
      update: {},
      create: {
        reference: c.ref,
        firstName: c.first,
        lastName: c.last,
        industry: c.industry,
        profession: c.profession,
        yearsOfExp: c.exp,
        languages: c.langs,
        status: 'AVAILABLE',
        isFeatured: true,
      },
    });
  }
  console.info(`   ✓ ${candidates.length} sample candidates`);

  // 5. Company license
  const existingLicense = await prisma.companyLicense.findFirst();
  if (!existingLicense) {
    await prisma.companyLicense.create({
      data: {
        licenseNumber: '0078',
        registerNumber: '0106',
        tin: '308231656',
        registrationNumber: '956266',
        issuingAuthority:
          'Agency for External Labour Migration, Ministry of Employment and Poverty Reduction of the Republic of Uzbekistan',
        isActive: true,
      },
    });
    console.info('   ✓ Company license record');
  }

  console.info('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
