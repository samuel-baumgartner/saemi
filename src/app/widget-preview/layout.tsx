import { privateMetadata } from '@/lib/seo';

export const metadata = { ...privateMetadata, title: 'Widget Preview' };

export default function WidgetPreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
