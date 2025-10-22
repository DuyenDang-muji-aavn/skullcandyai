import type { Meta, StoryObj } from '@storybook/react';
import { Cart } from './Cart';

const meta = {
  title: 'Components/Cart',
  component: Cart,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  args: {
    // Default handler for all stories
    onRemoveItem: (itemId: string) => {
      console.log('Remove item:', itemId);
      alert(`Removed item: ${itemId}`);
    },
  },
} satisfies Meta<typeof Cart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Empty Cart
export const Empty: Story = {
  args: {
    items: [],
  },
};

// Single Item
export const SingleItem: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
    ],
  },
};

// Multiple Items (3 items - shows flex-wrap)
export const MultipleItems: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 2,
        image: '/assets/products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 1,
        image: '/assets/products/product-102.png',
      },
    ],
  },
};

// Large Cart (5+ items - demonstrates flex-wrap and scrolling)
export const LargeCart: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 3,
        image: '/assets/products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 2,
        image: '/assets/products/product-102.png',
      },
      {
        id: '103',
        name: 'Lunar Moon Queen',
        price: 2.90,
        quantity: 1,
        image: '/assets/products/product-103.png',
      },
      {
        id: '104',
        name: 'Jolly Christmas Elf',
        price: 2.20,
        quantity: 4,
        image: '/assets/products/product-104.png',
      },
    ],
  },
};

// Many Items (8+ items - tests unlimited display)
export const ManyItems: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 2,
        image: '/assets/products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 1,
        image: '/assets/products/product-102.png',
      },
      {
        id: '103',
        name: 'Lunar Moon Queen',
        price: 2.90,
        quantity: 1,
        image: '/assets/products/product-103.png',
      },
      {
        id: '104',
        name: 'Jolly Christmas Elf',
        price: 2.20,
        quantity: 1,
        image: '/assets/products/product-104.png',
      },
      {
        id: '105',
        name: 'Galactic Astronaut',
        price: 3.00,
        quantity: 1,
        image: '/assets/products/product-105.png',
      },
      {
        id: '106',
        name: 'Rustic Farmer',
        price: 1.50,
        quantity: 1,
        image: '/assets/products/product-106.png',
      },
      {
        id: '107',
        name: 'Athletic Tennis Girl',
        price: 2.75,
        quantity: 1,
        image: '/assets/products/product-107.png',
      },
    ],
  },
};

// High Quantity Items
export const HighQuantity: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 10,
        image: '/assets/products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 25,
        image: '/assets/products/product-101.png',
      },
    ],
  },
};

// Long Product Names
export const LongNames: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker - Limited Edition Ultra Rare NFT Collection',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
    ],
  },
};

// Hover to Reveal Remove Buttons
export const WithRemoveButtons: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: '/assets/products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 2,
        image: '/assets/products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 1,
        image: '/assets/products/product-102.png',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Hover over any item thumbnail to reveal the remove button (red X icon).',
      },
    },
  },
};
