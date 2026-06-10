import {
  Search,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  Plane,
  LifeBuoy,
  ScrollText,
  Languages,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  slug: string;
  /** Maps to messages `Services.items.<key>.*` */
  key: string;
  icon: LucideIcon;
}

export const services: ServiceItem[] = [
  { slug: 'recruitment', key: 'recruitment', icon: Search },
  { slug: 'screening', key: 'screening', icon: ClipboardCheck },
  { slug: 'training', key: 'training', icon: GraduationCap },
  { slug: 'language', key: 'language', icon: Languages },
  { slug: 'documentation', key: 'documentation', icon: FileCheck2 },
  { slug: 'legal-compliance', key: 'compliance', icon: ScrollText },
  { slug: 'deployment', key: 'deployment', icon: Plane },
  { slug: 'aftercare', key: 'aftercare', icon: LifeBuoy },
];

export interface ProcessStep {
  /** Maps to messages `Process.steps.<key>.*` */
  key: string;
  icon: LucideIcon;
}

export const processSteps: ProcessStep[] = [
  { key: 'request', icon: ClipboardCheck },
  { key: 'sourcing', icon: Search },
  { key: 'screening', icon: FileCheck2 },
  { key: 'training', icon: GraduationCap },
  { key: 'documentation', icon: ScrollText },
  { key: 'deployment', icon: Plane },
];
