import { privateMetadata } from '@/lib/seo';

export const metadata = { ...privateMetadata, title: 'Focus & Sync Info' };

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
