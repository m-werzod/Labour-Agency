import { notFound } from 'next/navigation';

// Any path under a locale that doesn't match a known route renders the
// localized not-found page (src/app/[locale]/not-found.tsx).
export default function CatchAllPage() {
  notFound();
}
