'use client';

import React from 'react';
import { NFTCard } from '../nft-card';
import type { NFTCardProps } from '../nft-card/NFTCard.types';

/**
 * Client-side wrapper for NFTCard
 * Needed because NFTCard uses useState/useEffect for countdown timer
 */
export const NFTCardClient: React.FC<NFTCardProps> = (props) => {
  return <NFTCard {...props} onButtonClick={props.onButtonClick} />;
};
