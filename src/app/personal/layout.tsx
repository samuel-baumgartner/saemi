import { privateMetadata } from '@/lib/seo';

export const metadata = { ...privateMetadata, title: 'Personal Dashboard' };

export default function PersonalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
