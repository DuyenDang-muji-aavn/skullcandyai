import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';
import { NFTCard } from '../nft-card/NFTCard';

const meta = {
  title: 'Components/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6155',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Hero Section
export const Default: Story = {
  args: {
    title: 'Discover, collect, and sell extraordinary NFTs',
    description: 'Explore our curated marketplace featuring unique digital collectibles from talented artists worldwide. Start your NFT journey today.',
    ctaLabel: 'Explore',
    ctaOnClick: () => console.log('CTA clicked'),
  },
};

// With Featured NFT Card
export const WithFeaturedCard: Story = {
  args: {
    title: 'Discover, collect, and sell extraordinary NFTs',
    description: 'Explore our curated marketplace featuring unique digital collectibles from talented artists worldwide.',
    ctaLabel: 'Explore',
    ctaOnClick: () => console.log('CTA clicked'),
    featuredContent: (
      <NFTCard
        image="/assets/products/product-100.png"
        imageAlt="Featured NFT"
        title="Cryptic Hacker"
        author="CodeMaster"
        verified={true}
        countdown={{ hours: 4, minutes: 32, seconds: 15 }}
        price="3.75"
        currency="ETH"
        buttonText="Bid now"
      />
    ),
  },
};

// Custom CTA
export const CustomCTA: Story = {
  args: {
    title: 'Join the NFT Revolution',
    description: 'Be part of the future of digital ownership. Browse, buy, and sell unique digital assets.',
    ctaLabel: 'Get Started',
    ctaOnClick: () => alert('Getting started...'),
  },
};

// Short Content
export const ShortContent: Story = {
  args: {
    title: 'Welcome to SkullCandy',
    description: 'Your NFT marketplace.',
    ctaLabel: 'Browse',
    ctaOnClick: () => console.log('Browse clicked'),
  },
};

// Long Content
export const LongContent: Story = {
  args: {
    title: 'Discover, Collect, and Sell Extraordinary NFTs on the World\'s Leading Marketplace',
    description: 'Explore our extensive curated marketplace featuring thousands of unique digital collectibles from incredibly talented artists worldwide. Whether you\'re a seasoned collector or just starting your NFT journey, we have something special for everyone. Start discovering, bidding, and collecting today.',
    ctaLabel: 'Start Exploring Now',
    ctaOnClick: () => console.log('Exploring...'),
  },
};

// Without CTA
export const WithoutCTA: Story = {
  args: {
    title: 'Discover amazing NFTs',
    description: 'Browse our collection of unique digital art',
  },
};

// With Custom Background
export const WithCustomBackground: Story = {
  args: {
    title: 'Discover, collect, and sell extraordinary NFTs',
    description: 'Explore our curated marketplace featuring unique digital collectibles.',
    ctaLabel: 'Explore',
    ctaOnClick: () => console.log('CTA clicked'),
    background: (
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(132,235,127,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    ),
  },
};

// Real World - Landing Page
export const LandingPage: Story = {
  args: {
    title: 'Discover, collect, and sell extraordinary NFTs',
    description: 'On the world\'s first & largest NFT marketplace',
    ctaLabel: 'Explore',
    ctaOnClick: () => console.log('Navigate to marketplace'),
    featuredContent: (
      <NFTCard
        image="/assets/products/product-100.png"
        imageAlt="Featured Collection"
        title="Cryptic Hacker"
        author="CodeMaster"
        verified={true}
        countdown={{ hours: 4, minutes: 32, seconds: 15 }}
        price="3.75"
        currency="ETH"
        buttonText="Bid now"
        onButtonClick={() => console.log('Featured NFT clicked')}
      />
    ),
  },
};
