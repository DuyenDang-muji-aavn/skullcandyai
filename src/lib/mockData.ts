import type { NFT, User, CartItem, FeaturedNFT } from './types';

/**
 * Mock NFT data for the landing page
 * Based on the Figma design with 15 NFT cards in the Monthly Collection
 */
export const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Cryptic Hacker',
    creator: 'CodeMaster',
    image: '/images/nft-labubu.png',
    priceEth: 3.75,
    priceUsd: 3750.31,
    timeRemaining: 4 * 60 * 60 * 1000 + 12 * 60 * 1000 + 34 * 1000, // 4h 12m 34s
    verified: true,
  },
  {
    id: '2',
    title: 'Frosty Snow Queen',
    creator: 'WinterWhisper',
    image: '/images/nft-labubu.png',
    priceEth: 4.20,
    priceUsd: 4200.50,
    timeRemaining: 3 * 60 * 60 * 1000 + 45 * 60 * 1000 + 50 * 1000, // 3h 45m 50s
    verified: false,
  },
  {
    id: '3',
    title: 'Spooky Halloween Ghost',
    creator: 'PhantomArtist',
    image: '/images/nft-labubu.png',
    priceEth: 1.85,
    priceUsd: 1850.75,
    timeRemaining: 6 * 60 * 60 * 1000 + 5 * 60 * 1000 + 15 * 1000, // 6h 5m 15s
    verified: true,
  },
  {
    id: '4',
    title: 'Lunar Moon Queen',
    creator: 'CelestialDream',
    image: '/images/nft-labubu.png',
    priceEth: 2.90,
    priceUsd: 2900.25,
    timeRemaining: 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 10 * 1000, // 2h 30m 10s
    verified: false,
  },
  {
    id: '5',
    title: 'Jolly Christmas Elf',
    creator: 'HolidayJoy',
    image: '/images/nft-labubu.png',
    priceEth: 2.20,
    priceUsd: 2200.99,
    timeRemaining: 5 * 60 * 60 * 1000 + 55 * 60 * 1000 + 40 * 1000, // 5h 55m 40s
    verified: true,
  },
  {
    id: '6',
    title: 'Galactic Astronaut',
    creator: 'SpaceExplorer',
    image: '/images/nft-labubu.png',
    priceEth: 3.00,
    priceUsd: 3000.00,
    timeRemaining: 7 * 60 * 60 * 1000 + 25 * 60 * 1000 + 5 * 1000, // 7h 25m 5s
    verified: false,
  },
  {
    id: '7',
    title: 'Rustic Farmer',
    creator: 'EarthBound',
    image: '/images/nft-labubu.png',
    priceEth: 1.50,
    priceUsd: 1500.45,
    timeRemaining: 4 * 60 * 60 * 1000 + 15 * 60 * 1000 + 45 * 1000, // 4h 15m 45s
    verified: true,
  },
  {
    id: '8',
    title: 'Athletic Tennis Girl',
    creator: 'SportyStyle',
    image: '/images/nft-labubu.png',
    priceEth: 2.75,
    priceUsd: 2750.80,
    timeRemaining: 2 * 60 * 60 * 1000 + 33 * 60 * 1000 + 20 * 1000, // 2h 33m 20s
    verified: false,
  },
  {
    id: '9',
    title: 'Grapevine Wine Monster',
    creator: 'VinoVibes',
    image: '/images/nft-labubu.png',
    priceEth: 2.00,
    priceUsd: 2000.00,
    timeRemaining: 5 * 60 * 60 * 1000 + 10 * 60 * 1000 + 55 * 1000, // 5h 10m 55s
    verified: true,
  },
  {
    id: '10',
    title: 'Regal Rose Lord',
    creator: 'FloralMajesty',
    image: '/images/nft-labubu.png',
    priceEth: 3.50,
    priceUsd: 3500.99,
    timeRemaining: 3 * 60 * 60 * 1000 + 8 * 60 * 1000 + 12 * 1000, // 3h 8m 12s
    verified: false,
  },
  {
    id: '11',
    title: 'Skateboard Boy',
    creator: 'UrbanMotion',
    image: '/images/nft-labubu.png',
    priceEth: 1.95,
    priceUsd: 1950.55,
    timeRemaining: 4 * 60 * 60 * 1000 + 40 * 60 * 1000 + 22 * 1000, // 4h 40m 22s
    verified: true,
  },
  {
    id: '12',
    title: 'Oceanic Sea Princess',
    creator: 'AquaDreamer',
    image: '/images/nft-labubu.png',
    priceEth: 3.35,
    priceUsd: 3350.75,
    timeRemaining: 6 * 60 * 60 * 1000 + 35 * 60 * 1000 + 18 * 1000, // 6h 35m 18s
    verified: false,
  },
  {
    id: '13',
    title: 'Joyful Ice Cream Lover',
    creator: 'SweetTreats',
    image: '/images/nft-labubu.png',
    priceEth: 2.99,
    priceUsd: 2990.25,
    timeRemaining: 2 * 60 * 60 * 1000 + 22 * 60 * 1000 + 8 * 1000, // 2h 22m 8s
    verified: true,
  },
  {
    id: '14',
    title: 'Daring Pilot Captain',
    creator: 'SkyNavigator',
    image: '/images/nft-labubu.png',
    priceEth: 4.00,
    priceUsd: 4000.00,
    timeRemaining: 5 * 60 * 60 * 1000 + 45 * 60 * 1000 + 25 * 1000, // 5h 45m 25s
    verified: false,
  },
  {
    id: '15',
    title: 'Charming Valentine Cupid',
    creator: 'LoveArtisan',
    image: '/images/nft-labubu.png',
    priceEth: 3.60,
    priceUsd: 3600.88,
    timeRemaining: 3 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000, // 3h 15m 30s
    verified: true,
  },
  {
    id: '3',
    title: 'Spooky Halloween Ghost',
    creator: 'PhantomArtist',
    image: '/images/nft-labubu.png',
    priceEth: 1.85,
    priceUsd: 1850.75,
    timeRemaining: 6 * 60 * 60 * 1000 + 5 * 60 * 1000 + 15 * 1000, // 6h 5m 15s
    verified: true,
  },
  {
    id: '4',
    title: 'Lunar Moon Queen',
    creator: 'CelestialDream',
    image: '/images/nft-labubu.png',
    priceEth: 2.90,
    priceUsd: 2900.25,
    timeRemaining: 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 10 * 1000, // 2h 30m 10s
    verified: false,
  },
  {
    id: '5',
    title: 'Jolly Christmas Elf',
    creator: 'HolidayJoy',
    image: '/images/nft-labubu.png',
    priceEth: 2.20,
    priceUsd: 2200.99,
    timeRemaining: 5 * 60 * 60 * 1000 + 55 * 60 * 1000 + 40 * 1000, // 5h 55m 40s
    verified: true,
  },
  {
    id: '6',
    title: 'Galactic Astronaut',
    creator: 'SpaceExplorer',
    image: '/images/nft-labubu.png',
    priceEth: 3.00,
    priceUsd: 3000.00,
    timeRemaining: 7 * 60 * 60 * 1000 + 25 * 60 * 1000 + 5 * 1000, // 7h 25m 5s
    verified: false,
  },
  {
    id: '7',
    title: 'Rustic Farmer',
    creator: 'EarthBound',
    image: '/images/nft-labubu.png',
    priceEth: 1.50,
    priceUsd: 1500.45,
    timeRemaining: 4 * 60 * 60 * 1000 + 15 * 60 * 1000 + 45 * 1000, // 4h 15m 45s
    verified: true,
  },
  {
    id: '8',
    title: 'Athletic Tennis Girl',
    creator: 'SportyStyle',
    image: '/images/nft-labubu.png',
    priceEth: 2.75,
    priceUsd: 2750.80,
    timeRemaining: 2 * 60 * 60 * 1000 + 33 * 60 * 1000 + 20 * 1000, // 2h 33m 20s
    verified: false,
  },
  {
    id: '9',
    title: 'Grapevine Wine Monster',
    creator: 'VinoVibes',
    image: '/images/nft-labubu.png',
    priceEth: 2.00,
    priceUsd: 2000.00,
    timeRemaining: 5 * 60 * 60 * 1000 + 10 * 60 * 1000 + 55 * 1000, // 5h 10m 55s
    verified: true,
  },
  {
    id: '10',
    title: 'Regal Rose Lord',
    creator: 'FloralMajesty',
    image: '/images/nft-labubu.png',
    priceEth: 3.50,
    priceUsd: 3500.99,
    timeRemaining: 3 * 60 * 60 * 1000 + 8 * 60 * 1000 + 12 * 1000, // 3h 8m 12s
    verified: false,
  },
  {
    id: '11',
    title: 'Skateboard Boy',
    creator: 'UrbanMotion',
    image: '/images/nft-labubu.png',
    priceEth: 1.95,
    priceUsd: 1950.55,
    timeRemaining: 4 * 60 * 60 * 1000 + 40 * 60 * 1000 + 22 * 1000, // 4h 40m 22s
    verified: true,
  },
  {
    id: '12',
    title: 'Oceanic Sea Princess',
    creator: 'AquaDreamer',
    image: '/images/nft-labubu.png',
    priceEth: 3.35,
    priceUsd: 3350.75,
    timeRemaining: 6 * 60 * 60 * 1000 + 35 * 60 * 1000 + 18 * 1000, // 6h 35m 18s
    verified: false,
  },
  {
    id: '13',
    title: 'Joyful Ice Cream Lover',
    creator: 'SweetTreats',
    image: '/images/nft-labubu.png',
    priceEth: 2.99,
    priceUsd: 2990.25,
    timeRemaining: 2 * 60 * 60 * 1000 + 22 * 60 * 1000 + 8 * 1000, // 2h 22m 8s
    verified: true,
  },
  {
    id: '14',
    title: 'Daring Pilot Captain',
    creator: 'SkyNavigator',
    image: '/images/nft-labubu.png',
    priceEth: 4.00,
    priceUsd: 4000.00,
    timeRemaining: 5 * 60 * 60 * 1000 + 45 * 60 * 1000 + 25 * 1000, // 5h 45m 25s
    verified: false,
  },
  {
    id: '15',
    title: 'Charming Valentine Cupid',
    creator: 'LoveArtisan',
    image: '/images/nft-labubu.png',
    priceEth: 3.60,
    priceUsd: 3600.88,
    timeRemaining: 3 * 60 * 60 * 1000 + 15 * 60 * 1000 + 30 * 1000, // 3h 15m 30s
    verified: true,
  },
];

/**
 * Featured NFT for the hero section
 * Based on "HAPE #6959" from the Figma design
 */
export const mockFeaturedNFT: FeaturedNFT = {
  id: 'featured-1',
  title: 'HAPE #6959',
  creator: 'HAPES PRIME',
  image: '/images/nft-labubu.png',
  priceEth: 5.758,
  priceUsd: 5758.31,
  timeRemaining: 17 * 60 * 60 * 1000 + 56 * 60 * 1000 + 3 * 1000, // 17h 56m 03s
  verified: true,
  currentBid: 5.758,
  latestBidUsd: 5758.31,
  priceChange: 12.45,
  priceChangeDirection: 'up',
};

/**
 * Mock user data
 * Based on "MUJI" user from the Figma cart design
 */
export const mockUser: User = {
  id: 'user-1',
  username: 'MUJI',
  avatarUrl: '/images/avatars/muji.png',
  walletAddress: '0x1234...5678',
};

/**
 * Mock cart items
 * Based on the 3 items shown in the footer cart
 */
export const mockCartItems: CartItem[] = [
  {
    nft: mockNFTs[0], // Cryptic Hacker
    addedAt: Date.now() - 1000 * 60 * 15, // Added 15 minutes ago
  },
  {
    nft: mockNFTs[1], // Frosty Snow Queen
    addedAt: Date.now() - 1000 * 60 * 30, // Added 30 minutes ago
  },
  {
    nft: mockNFTs[3], // Lunar Moon Queen
    addedAt: Date.now() - 1000 * 60 * 5, // Added 5 minutes ago
  },
];

/**
 * Calculate total ETH value of cart items
 */
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.nft.priceEth, 0);
};

/**
 * Format time remaining as "Xh : Xm : Xs"
 */
export const formatTimeRemaining = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return `${hours}h : ${minutes}m : ${seconds}s`;
};
