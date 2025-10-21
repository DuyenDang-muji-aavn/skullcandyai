import type { Meta, StoryObj } from '@storybook/react';
import { NFTCard } from './NFTCard';

const meta = {
  title: 'Components/NFTCard',
  component: NFTCard,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6088',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    verified: {
      control: 'boolean',
      description: 'Show verified badge',
    },
    countdown: {
      control: 'object',
      description: 'Countdown timer object',
    },
    currency: {
      control: 'text',
      description: 'Currency code',
    },
    buttonText: {
      control: 'text',
      description: 'Button label',
    },
  },
} satisfies Meta<typeof NFTCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default NFT Card
export const Default: Story = {
  args: {
    image: '/assets/products/product-100.png',
    imageAlt: 'Cryptic Hacker NFT',
    title: 'Cryptic Hacker',
    author: 'CodeMaster',
    verified: true,
    countdown: {
      hours: 4,
      minutes: 32,
      seconds: 15,
    },
    price: '3.75',
    currency: 'ETH',
    buttonText: 'Bid now',
  },
};

// Without Verified Badge
export const Unverified: Story = {
  args: {
    image: '/assets/products/product-101.png',
    imageAlt: 'Frosty Snow Queen',
    title: 'Frosty Snow Queen',
    author: 'WinterWhisper',
    verified: false,
    countdown: {
      hours: 2,
      minutes: 15,
      seconds: 48,
    },
    price: '4.20',
    currency: 'ETH',
    buttonText: 'Bid now',
  },
};

// Without Countdown
export const NoCountdown: Story = {
  args: {
    image: '/assets/products/product-102.png',
    imageAlt: 'Spooky Halloween Ghost',
    title: 'Spooky Halloween Ghost',
    author: 'PhantomArtist',
    verified: true,
    price: '1.85',
    currency: 'ETH',
    buttonText: 'Buy now',
  },
};

// High Price
export const HighPrice: Story = {
  args: {
    image: '/assets/products/product-103.png',
    imageAlt: 'Lunar Moon Queen',
    title: 'Lunar Moon Queen',
    author: 'CelestialDream',
    verified: true,
    countdown: {
      hours: 12,
      minutes: 0,
      seconds: 0,
    },
    price: '999.99',
    currency: 'ETH',
    buttonText: 'Place bid',
  },
};

// Low Price
export const LowPrice: Story = {
  args: {
    image: '/assets/products/product-104.png',
    imageAlt: 'Jolly Christmas Elf',
    title: 'Jolly Christmas Elf',
    author: 'HolidayJoy',
    verified: false,
    countdown: {
      hours: 0,
      minutes: 45,
      seconds: 30,
    },
    price: '0.15',
    currency: 'ETH',
    buttonText: 'Bid now',
  },
};

// Expiring Soon
export const ExpiringSoon: Story = {
  args: {
    image: '/assets/products/product-105.png',
    imageAlt: 'Galactic Astronaut',
    title: 'Galactic Astronaut',
    author: 'SpaceExplorer',
    verified: true,
    countdown: {
      hours: 0,
      minutes: 5,
      seconds: 23,
    },
    price: '3.00',
    currency: 'ETH',
    buttonText: 'Quick bid',
  },
};

// Long Names
export const LongNames: Story = {
  args: {
    image: '/assets/products/product-106.png',
    imageAlt: 'Very Long Product Name',
    title: 'The Most Amazing Ultra Rare Limited Edition Collector NFT',
    author: 'SuperLongCreatorNameThatMightOverflow',
    verified: true,
    countdown: {
      hours: 24,
      minutes: 59,
      seconds: 59,
    },
    price: '12.50',
    currency: 'ETH',
    buttonText: 'Place your bid now',
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    image: '/assets/products/product-100.png',
    imageAlt: 'NFT Image',
    title: 'Your NFT Title',
    author: 'Creator Name',
    verified: true,
    countdown: {
      hours: 4,
      minutes: 30,
      seconds: 0,
    },
    price: '3.75',
    currency: 'ETH',
    buttonText: 'Bid now',
  },
};

// Custom Button Action
export const WithCustomAction: Story = {
  args: {
    image: '/assets/products/product-100.png',
    imageAlt: 'Cryptic Hacker',
    title: 'Cryptic Hacker',
    author: 'CodeMaster',
    verified: true,
    countdown: {
      hours: 4,
      minutes: 32,
      seconds: 15,
    },
    price: '3.75',
    currency: 'ETH',
    buttonText: 'Bid now',
    onButtonClick: () => alert('Bid button clicked!'),
  },
};
