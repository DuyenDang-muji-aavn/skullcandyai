import type { Meta, StoryObj } from '@storybook/react';
import { NFTGrid } from './NFTGrid';
import { NFTCard } from '../nft-card/NFTCard';

const meta = {
  title: 'Components/NFTGrid',
  component: NFTGrid,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6074',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Gap between grid items',
    },
  },
} satisfies Meta<typeof NFTGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample NFT cards for stories
const sampleCards = [
  <NFTCard
    key="1"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png"
    imageAlt="Cryptic Hacker"
    title="Cryptic Hacker"
    author="CodeMaster"
    verified={true}
    countdown={{ hours: 4, minutes: 32, seconds: 15 }}
    price="3.75"
    currency="ETH"
    buttonText="Bid now"
  />,
  <NFTCard
    key="2"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931750/skullcandy-products/product-101.png"
    imageAlt="Frosty Snow Queen"
    title="Frosty Snow Queen"
    author="WinterWhisper"
    verified={true}
    countdown={{ hours: 2, minutes: 15, seconds: 48 }}
    price="4.20"
    currency="ETH"
    buttonText="Bid now"
  />,
  <NFTCard
    key="3"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931771/skullcandy-products/product-102.png"
    imageAlt="Spooky Halloween Ghost"
    title="Spooky Halloween Ghost"
    author="PhantomArtist"
    verified={false}
    countdown={{ hours: 5, minutes: 0, seconds: 0 }}
    price="1.85"
    currency="ETH"
    buttonText="Bid now"
  />,
  <NFTCard
    key="4"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931800/skullcandy-products/product-103.png"
    imageAlt="Lunar Moon Queen"
    title="Lunar Moon Queen"
    author="CelestialDream"
    verified={true}
    countdown={{ hours: 8, minutes: 45, seconds: 20 }}
    price="2.90"
    currency="ETH"
    buttonText="Bid now"
  />,
  <NFTCard
    key="5"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931831/skullcandy-products/product-104.png"
    imageAlt="Jolly Christmas Elf"
    title="Jolly Christmas Elf"
    author="HolidayJoy"
    verified={true}
    countdown={{ hours: 1, minutes: 30, seconds: 0 }}
    price="2.20"
    currency="ETH"
    buttonText="Bid now"
  />,
  <NFTCard
    key="6"
    image="https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931858/skullcandy-products/product-105.png"
    imageAlt="Galactic Astronaut"
    title="Galactic Astronaut"
    author="SpaceExplorer"
    verified={false}
    countdown={{ hours: 3, minutes: 15, seconds: 45 }}
    price="3.00"
    currency="ETH"
    buttonText="Bid now"
  />,
];

// Grid Without Header
export const WithoutHeader: Story = {
  args: {
    children: sampleCards.slice(0, 3),
    gap: 'md',
  },
};

// Grid With Header
export const WithHeader: Story = {
  args: {
    title: 'Trending NFTs',
    description: 'Discover the hottest NFTs in the marketplace',
    children: sampleCards.slice(0, 3),
    gap: 'md',
  },
};

// Grid With Search
export const WithSearch: Story = {
  args: {
    title: 'Browse Collection',
    description: 'Find your next favorite NFT',
    searchPlaceholder: 'Search by topics or collections',
    onSearchChange: (query) => console.log('Search:', query),
    children: sampleCards.slice(0, 3),
    gap: 'md',
  },
};

// Small Gap
export const SmallGap: Story = {
  args: {
    title: 'Compact Grid',
    children: sampleCards.slice(0, 6),
    gap: 'sm',
  },
};

// Large Gap
export const LargeGap: Story = {
  args: {
    title: 'Spacious Grid',
    children: sampleCards.slice(0, 6),
    gap: 'lg',
  },
};

// Single Item
export const SingleItem: Story = {
  args: {
    title: 'Featured NFT',
    description: 'Top pick of the day',
    children: sampleCards.slice(0, 1),
    gap: 'md',
  },
};

// Two Items
export const TwoItems: Story = {
  args: {
    title: 'Editor\'s Choice',
    children: sampleCards.slice(0, 2),
    gap: 'md',
  },
};

// Six Items (2 rows)
export const SixItems: Story = {
  args: {
    title: 'Popular Collection',
    description: 'Most viewed this week',
    children: sampleCards,
    gap: 'md',
  },
};

// Many Items (scrollable)
export const ManyItems: Story = {
  args: {
    title: 'All NFTs',
    description: 'Browse our complete collection',
    searchPlaceholder: 'Search by name or artist',
    children: [...sampleCards, ...sampleCards, ...sampleCards],
    gap: 'md',
  },
};

// Empty Grid
export const Empty: Story = {
  args: {
    title: 'No Results Found',
    description: 'Try adjusting your search criteria',
    children: [],
    gap: 'md',
  },
};

// Real World - Landing Page
export const LandingPage: Story = {
  args: {
    title: 'Trending NFTs',
    description: 'Discover, collect, and sell extraordinary NFTs',
    searchPlaceholder: 'Search by topics or collections',
    onSearchChange: (query) => console.log('Filtering:', query),
    children: sampleCards,
    gap: 'md',
  },
};
