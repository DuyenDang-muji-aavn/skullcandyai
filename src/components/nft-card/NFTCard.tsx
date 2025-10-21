'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '../button/Button';
import { NFTCardProps } from './NFTCard.types';

export const NFTCard = React.forwardRef<HTMLDivElement, NFTCardProps>(
  (
    {
      image,
      imageAlt,
      title,
      author,
      verified = false,
      countdown,
      price,
      currency = 'ETH',
      currencyIcon = '/ethereum-icon.svg',
      buttonText = 'Bid now',
      onButtonClick,
      className = '',
    },
    ref
  ) => {
    // Track if component is mounted (client-side only)
    const [isMounted, setIsMounted] = React.useState(false);
    
    // Live countdown timer state
    const [liveCountdown, setLiveCountdown] = React.useState(countdown);

    // Set mounted state on client
    React.useEffect(() => {
      setIsMounted(true);
    }, []);

    // Update countdown every second
    React.useEffect(() => {
      if (!countdown) return;

      const interval = setInterval(() => {
        setLiveCountdown((prev) => {
          if (!prev) return undefined;

          const totalSeconds =
            prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

          if (totalSeconds <= 0) {
            clearInterval(interval);
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          return {
            hours: Math.floor(totalSeconds / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
          };
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [countdown]);

    // Format countdown display
    const formatTime = (num: number) => String(num).padStart(2, '0');
    const countdownDisplay = liveCountdown
      ? `${formatTime(liveCountdown.hours)}h : ${formatTime(liveCountdown.minutes)}m : ${formatTime(liveCountdown.seconds)}s`
      : null;

    return (
      <article
        ref={ref}
        className={`
          backdrop-blur-glass
          bg-glass-light
          glass-border-gradient
          rounded-card
          flex flex-col items-center
          pt-0 px-3 pb-3
          relative
          isolate
          group
          hover:shadow-card-hover
          transition-all duration-300
          basis-0
          grow
          shrink-0
          max-w-[432px]
          min-w-[314px]
          ${className}
        `}
        aria-label={`NFT: ${title} by ${author}`}
      >
        {/* ✅ IMAGE CONTAINER - Negative margin TOP & BOTTOM for overlap */}
        <div
          className="flex gap-2 items-center justify-center relative shrink-0 w-full z-[2]"
          style={{ 
            marginTop: 'var(--spacing-negative-6)',
            marginBottom: 'var(--spacing-negative-3)'
          }}
        >
          <div className="size-[240px] relative shrink-0">
            <Image
              src={image}
              alt={imageAlt || `${title} NFT artwork`}
              width={240}
              height={240}
              className="object-cover object-center rounded-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* ✅ INFO CONTAINER - Dark glass with backdrop blur */}
        <div
          className="backdrop-blur-glass bg-glass-dark flex flex-col gap-4 items-center justify-end p-4 relative rounded-card shrink-0 w-full z-[1]"
        >
          {/* Title + Author + Countdown */}
          <div className="flex items-end justify-between relative shrink-0 w-full">
            {/* Title Container */}
            <div className="flex flex-col gap-0.5 grow items-start relative shrink-0 text-white">
              <h3 className="font-family-title font-bold text-card-title-nft w-full">
                {title}
              </h3>
              <p className="font-family-body font-normal opacity-70 text-card-author w-full">
                By {author}
              </p>
            </div>

            {/* Countdown Badge - No backdrop blur per latest design */}
            {isMounted && countdownDisplay && (
              <time
                className="flex gap-2 items-center justify-center px-2 py-0 relative shrink-0"
                aria-label={`Auction ends in ${countdown?.hours} hours, ${countdown?.minutes} minutes, ${countdown?.seconds} seconds`}
              >
                <span 
                  className="font-family-body font-bold text-card-badge text-center whitespace-nowrap text-white"
                >
                  {countdownDisplay}
                </span>
              </time>
            )}
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between relative shrink-0 w-full">
            {/* Price Container */}
            <div className="flex gap-2 items-center relative shrink-0" aria-label={`Price: ${price} ${currency}`}>
              {/* ETH Icon */}
              <div className="relative shrink-0 w-8 h-8">
                <Image
                  src={currencyIcon}
                  alt={currency}
                  width={32}
                  height={32}
                  className="inline-block"
                />
              </div>

              {/* Price Text */}
              <div className="flex font-family-body font-bold gap-2 items-center text-card-price-nft whitespace-nowrap text-white">
                <span>{price}</span>
                <span>{currency}</span>
              </div>
            </div>

            {/* Button */}
            <Button
              size="M"
              style="Neutral"
              onClick={onButtonClick}
              className="h-[47px] whitespace-nowrap"
              aria-label={`${buttonText} for ${title}`}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </article>
    );
  }
);

NFTCard.displayName = 'NFTCard';
