import type { Metadata } from 'next';
import { Orbitron, Outfit } from 'next/font/google';
import '@/styles/globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '700', '900'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'SkullCandy - ePost',
  description: 'Design system implementation for SkullCandy project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
