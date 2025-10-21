import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeading } from './SectionHeading';

const meta = {
  title: 'Components/SectionHeading',
  component: SectionHeading,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6082',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment',
    },
    title: {
      control: 'text',
      description: 'Main heading title',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
  },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

// Title Only - Center Aligned
export const TitleOnlyCenter: Story = {
  args: {
    title: 'Trending NFTs',
    align: 'center',
  },
};

// Title Only - Left Aligned
export const TitleOnlyLeft: Story = {
  args: {
    title: 'Trending NFTs',
    align: 'left',
  },
};

// With Description - Center
export const WithDescriptionCenter: Story = {
  args: {
    title: 'Trending NFTs',
    description: 'Discover the hottest NFTs in the marketplace right now',
    align: 'center',
  },
};

// With Description - Left
export const WithDescriptionLeft: Story = {
  args: {
    title: 'Trending NFTs',
    description: 'Discover the hottest NFTs in the marketplace right now',
    align: 'left',
  },
};

// Multi-line Description - Center
export const MultiLineDescriptionCenter: Story = {
  args: {
    title: 'Explore Collections',
    description: 'Browse through thousands of unique NFTs from talented artists around the world. Find your next favorite piece and start collecting today.',
    align: 'center',
  },
};

// Multi-line Description - Left
export const MultiLineDescriptionLeft: Story = {
  args: {
    title: 'Explore Collections',
    description: 'Browse through thousands of unique NFTs from talented artists around the world. Find your next favorite piece and start collecting today.',
    align: 'left',
  },
};

// Long Title
export const LongTitle: Story = {
  args: {
    title: 'Discover Amazing Ultra Rare Limited Edition NFT Collections',
    description: 'Find your next treasure',
    align: 'center',
  },
};

// With Search Handler
export const WithSearchHandler: Story = {
  args: {
    title: 'Search NFTs',
    description: 'Type to filter results',
    searchPlaceholder: 'Search by name or collection',
    onSearchChange: (query) => console.log('Search query:', query),
    align: 'center',
  },
};

// Custom Search Placeholder
export const CustomSearchPlaceholder: Story = {
  args: {
    title: 'Find Your NFT',
    description: 'Search our extensive collection',
    searchPlaceholder: 'Type artist name, collection, or keyword...',
    align: 'center',
  },
};

// Real World Example - Landing Page
export const LandingPageHero: Story = {
  args: {
    title: 'Trending NFTs',
    description: 'Discover, collect, and sell extraordinary NFTs',
    searchPlaceholder: 'Search by topics or collections',
    align: 'center',
  },
};

// Real World Example - Collection Page
export const CollectionPage: Story = {
  args: {
    title: 'Featured Collection',
    description: 'Exclusive drops from top-tier artists',
    align: 'left',
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    title: 'Latest',
    align: 'left',
  },
};
