import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6151',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Footer
export const Default: Story = {
  args: {},
};

// With Cart Info (Empty)
export const WithEmptyCart: Story = {
  args: {
    cart: {
      itemCount: 0,
      total: '0.00',
    },
  },
};

// With Cart Info (Single Item)
export const WithSingleItem: Story = {
  args: {
    cart: {
      itemCount: 1,
      total: '3.75',
    },
  },
};

// With Cart Info (Multiple Items)
export const WithMultipleItems: Story = {
  args: {
    cart: {
      itemCount: 5,
      total: '18.50',
    },
  },
};

// With Cart Info (High Value)
export const WithHighValue: Story = {
  args: {
    cart: {
      itemCount: 25,
      total: '1,234.56',
    },
  },
};

// With Custom Content
export const WithCustomContent: Story = {
  args: {
    children: (
      <div style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', opacity: 0.7 }}>
          © 2025 SkullCandy. All rights reserved.
        </p>
        <div style={{ marginTop: '10px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    ),
  },
};

// With Custom Class
export const WithCustomClass: Story = {
  args: {
    className: 'shadow-2xl',
    cart: {
      itemCount: 3,
      total: '12.45',
    },
  },
};

// Real World - With Cart and Links
export const RealWorld: Story = {
  args: {
    cart: {
      itemCount: 8,
      total: '29.75',
    },
    children: (
      <div style={{ 
        padding: '40px 20px', 
        color: 'white',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px',
        }}>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>Marketplace</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.7 }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>All NFTs</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Art</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Music</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Collectibles</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>My Account</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.7 }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Profile</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Favorites</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>My Collections</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Settings</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.7 }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Help Center</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Platform Status</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Partners</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Blog</a>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.7 }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Careers</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Ventures</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Grants</a>
            </div>
          </div>
        </div>
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          opacity: 0.7,
        }}>
          <p>© 2025 SkullCandy. All rights reserved.</p>
        </div>
      </div>
    ),
  },
};
