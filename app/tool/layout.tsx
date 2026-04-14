import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laptop Diagnostic Tool — LaptopScout',
  description: 'Run a complete health check on any used laptop. Verify battery, RAM, SSD, and GPU in 2 minutes.',
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
