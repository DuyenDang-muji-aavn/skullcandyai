export interface NFTCardProps {
  // Image
  /** NFT image URL */
  image: string;
  /** Alt text for image */
  imageAlt?: string;
  
  // Title & Author
  /** NFT title */
  title: string;
  /** Creator/author name */
  author: string;
  /** Show verified badge next to author */
  verified?: boolean;
  
  // Countdown
  /** Countdown timer for auction/sale end */
  countdown?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  
  // Price
  /** Current price (e.g., "3.75") */
  price: string;
  /** Currency code (default: "ETH") */
  currency?: string;
  /** Currency icon URL (optional) */
  currencyIcon?: string;
  
  // Button
  /** Button text (default: "Bid now") */
  buttonText?: string;
  /** Button click handler */
  onButtonClick?: () => void;
  
  // Styling
  /** Additional CSS classes */
  className?: string;
}
