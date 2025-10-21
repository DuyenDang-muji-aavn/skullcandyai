'use client';

import Link from 'next/link';
import { Button } from '@/components/button';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden text-white flex items-center justify-center">
      {/* Background - Same gradient as home */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          background: 'linear-gradient(119deg, #094DF7 11.35%, rgba(165, 190, 249, 0.90) 54.74%, rgba(82, 100, 250, 0.90) 101.78%)'
        }}
      />

      {/* Content */}
      <div className="text-center px-8">
        <h1 className="font-orbitron font-bold text-6xl mb-6">
          Features
        </h1>
        <p className="font-outfit text-2xl mb-8 opacity-80">
          Coming Soon
        </p>
        <p className="font-outfit text-lg mb-12 max-w-2xl mx-auto opacity-70">
          We&apos;re working hard to bring you exciting new features. 
          Stay tuned for updates!
        </p>
        <Link href="/">
          <Button size="L" style="CTA">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
