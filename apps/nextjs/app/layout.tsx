import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turborepo Starter Kit',
  description: 'Next.js app in a Turborepo monorepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
