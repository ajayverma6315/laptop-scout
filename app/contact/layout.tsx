import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — LaptopScout',
  description: 'Have a question or feedback? Get in touch with the LaptopScout team.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
