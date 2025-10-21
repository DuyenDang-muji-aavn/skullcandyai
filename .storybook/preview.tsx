import type { Preview } from '@storybook/react';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';
import * as NextImage from 'next/image';

// Mock Next.js Image component for Storybook
// Use try-catch to handle potential redefinition errors
try {
  // Delete the property first if it exists
  if ('default' in NextImage) {
    delete (NextImage as any).default;
  }

  Object.defineProperty(NextImage, 'default', {
    configurable: true,
    writable: true,
    value: (props: any) => {
      const { fill, ...rest } = props;
      return (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          {...rest}
          className={`${props.className || ''} ${fill ? 'absolute inset-0 w-full h-full' : ''}`}
          style={{
            ...(props.style || {}),
            ...(fill ? { objectFit: props.objectFit || 'cover' } : {}),
          }}
        />
      );
    },
  });
} catch (error) {
  console.warn('Failed to mock Next.js Image:', error);
}

// Load fonts from Google Fonts for Storybook
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@400;500;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
  
  // Add CSS variables to root
  const style = document.createElement('style');
  style.textContent = ':root { --font-orbitron: "Orbitron", sans-serif; --font-outfit: "Outfit", sans-serif; }';
  document.head.appendChild(style);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
};

export default preview;
