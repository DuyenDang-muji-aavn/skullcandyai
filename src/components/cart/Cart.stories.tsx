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
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png',
      },
    ],
  },
};

// Multiple Items
export const MultipleItems: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 2,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931750/skullcandy-products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 1,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931771/skullcandy-products/product-102.png',
      },
    ],
  },
};

// Large Cart (Many Items)
export const LargeCart: Story = {
  args: {
    items: [
      {
        id: '100',
        name: 'Cryptic Hacker',
        price: 3.75,
        quantity: 1,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 3,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931750/skullcandy-products/product-101.png',
      },
      {
        id: '102',
        name: 'Spooky Halloween Ghost',
        price: 1.85,
        quantity: 2,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931771/skullcandy-products/product-102.png',
      },
      {
        id: '103',
        name: 'Lunar Moon Queen',
        price: 2.90,
        quantity: 1,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931800/skullcandy-products/product-103.png',
      },
      {
        id: '104',
        name: 'Jolly Christmas Elf',
        price: 2.20,
        quantity: 4,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931831/skullcandy-products/product-104.png',
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
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png',
      },
      {
        id: '101',
        name: 'Frosty Snow Queen',
        price: 4.20,
        quantity: 25,
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931750/skullcandy-products/product-101.png',
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
        image: 'https://res.cloudinary.com/dtes5pcfm/image/upload/v1760931715/skullcandy-products/product-100.png',
      },
    ],
  },
};
