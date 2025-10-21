'use client';

import * as React from 'react';
import Image from 'next/image';

/**
 * FeaturedSection component with 3D card effects
 * Implements exact Figma positioning with responsive scaling
 * Updated: 2025-10-18 - Matches latest Figma design
 * @see docs/components/HeroSection.md for specifications
 */
export const FeaturedSection: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Container with responsive scaling */}
      <div 
        className="
          relative 
          w-[793px] 
          h-[918px] 
          max-w-full 
          mx-auto
          scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-100
          origin-center
        "
        style={{ transformOrigin: 'center center' }}
      >
        {/* Background Decorative Vectors */}
        <div 
          className="absolute pointer-events-none z-0"
          style={{
            left: '392.99px',
            top: '191px',
            transform: 'rotate(39.402deg)',
            width: '243.821px',
            height: '484.796px',
          }}
        >
          <Image
            src="/images/hero-vector-5.svg"
            alt=""
            width={244}
            height={485}
            className="w-full h-full"
          />
        </div>

        <div 
          className="absolute pointer-events-none z-0"
          style={{
            left: '-65px',
            top: '0',
            transform: 'rotate(39.402deg)',
            width: '275.127px',
            height: '547.043px',
          }}
        >
          <Image
            src="/images/hero-vector-6.svg"
            alt=""
            width={275}
            height={547}
            className="w-full h-full"
          />
        </div>

        {/* Hover Card Background - Top */}
        <div
          className="absolute glass-border-gradient bg-[rgba(0,0,0,0.1)] backdrop-blur-[107.053px] backdrop-filter rounded-[32px] z-[1]"
          style={{
            left: '201.96px',
            top: '35px',
            width: '543.04px',
            height: '558px',
            transform: 'skewX(-10.331deg)',
          }}
        />

        {/* Hover Card Background - Bottom */}
        <div
          className="absolute glass-border-gradient bg-[rgba(0,0,0,0.1)] backdrop-blur-[107.053px] backdrop-filter rounded-[32px] z-[1]"
          style={{
            left: '272.69px',
            top: '128.46px',
            width: '570.21px',
            height: '613.54px',
            transform: 'skewX(-10.331deg)',
          }}
        />

        {/* Main Featured Image - Skull Character */}
        <div
          className="absolute shadow-[16px_16px_36px_0px_rgba(0,0,0,0.1)] z-[2]"
          style={{
            left: '94.87px',
            top: '72px',
            width: '517.455px',
            height: '548px',
            transform: 'skewX(-10.331deg)',
          }}
        >
          <Image
            src="/images/hero-skull-character.png"
            alt="Featured NFT Character"
            width={517}
            height={548}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        {/* HAPE #6959 Card - Center */}
        <div
          className="absolute z-[3]"
          style={{
            left: '406px',
            top: '439.99px',
            width: '364.379px',
          }}
        >
          <div 
            style={{
              transform: 'rotate(-0.339deg) skewX(-10.353deg)',
            }}
          >
            <div 
              className="
                backdrop-blur-[100px] 
                backdrop-filter 
                bg-[rgba(255,255,255,0.1)]
                glass-border-gradient
                rounded-[32px]
                h-[100.043px]
                w-full
                relative
              "
            >
              {/* Avatar - positioned absolutely */}
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  left: '21.19px',
                  top: '16.31px',
                  transform: 'skewX(0.383deg)',
                }}
              >
                <div className="relative w-[67.446px] h-[67.362px] shrink-0">
                  <Image
                    src="/images/avatar-1.png"
                    alt="HAPE Avatar"
                    width={67}
                    height={67}
                    className="absolute inset-0 rounded-[10px] object-cover"
                  />
                  <Image
                    src="/images/avatar-2.png"
                    alt=""
                    width={67}
                    height={67}
                    className="absolute inset-0 rounded-[10px] object-cover"
                  />
                  <Image
                    src="/images/avatar-overlay.png"
                    alt=""
                    width={73}
                    height={73}
                    className="absolute -inset-[7.937%] object-cover"
                  />
                </div>
              </div>

              {/* Details - positioned absolutely */}
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  left: '110.03px',
                  top: '21.64px',
                  transform: 'skewX(0.383deg)',
                }}
              >
                <div className="flex flex-col gap-[7.494px] font-family-body font-normal text-white leading-[0] w-[226.55px]">
                  <div className="flex flex-col justify-center text-[29.975px]">
                    <p className="leading-normal">HAPE #6959</p>
                  </div>
                  <div className="flex flex-col justify-center opacity-70 text-[13.917px]">
                    <p className="leading-normal">HAPES PRIME</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bid Card - Bottom Left */}
        <div
          className="absolute z-[4]"
          style={{
            left: '35.63px',
            top: '559.89px',
            transform: 'skewX(-10.301deg)',
          }}
        >
          <div 
            className="
              bg-[rgba(255,255,255,0.1)]
              backdrop-blur-[100px]
              backdrop-filter
              glass-border-gradient
              rounded-[32px]
              p-[21.411px]
              w-[344.037px]
              h-[105.623px]
              flex
              items-center
              justify-center
            "
          >
            <div className="flex gap-[42.821px] items-start justify-center w-full px-[3.212px]">
              <div className="flex flex-col text-white font-family-body font-normal leading-[0]">
                <div className="flex flex-col justify-center text-[25.693px]">
                  <p className="leading-normal">5.758 ETH</p>
                </div>
                <div className="flex flex-col justify-center text-[14.987px]">
                  <p className="leading-normal">Latest Bid</p>
                </div>
              </div>
              <div className="flex flex-col text-right font-family-body font-normal leading-[0]">
                <div className="flex flex-col justify-center text-[21.411px] text-white">
                  <p className="leading-normal">$5758.31</p>
                </div>
                <div className="flex flex-col justify-center text-[14.987px] text-white">
                  <p className="leading-normal">+12.45%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BID NOW! Card - Top Right */}
        <div
          className="absolute z-[4]"
          style={{
            left: '501.51px',
            top: '60.72px',
            transform: 'skewX(-10.301deg)',
          }}
        >
          <div 
            className="
              backdrop-blur-[13.382px]
              backdrop-filter
              bg-[rgba(255,255,255,0.1)]
              glass-border-gradient
              rounded-[32px]
              p-[21.411px]
              w-[201.359px]
              h-[73.987px]
              flex
              items-center
              justify-center
            "
          >
            <div className="flex flex-col text-white font-family-body font-normal">
              <p className="text-[25.693px] leading-normal">BID NOW!</p>
              <div className="flex flex-col justify-center leading-[0] text-[14.987px]">
                <p className="leading-normal">Latest Collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auction End In Card - Separate (Left side) */}
        <div
          className="absolute z-[4]"
          style={{
            left: '114.85px',
            top: '720.47px',
            transform: 'skewX(-10.301deg)',
          }}
        >
          <div 
            className="
              bg-[rgba(255,255,255,0.1)]
              backdrop-blur-[100px]
              backdrop-filter
              glass-border-gradient
              rounded-[32px]
              p-[21.411px]
              w-[135.126px]
              h-[89.263px]
              flex
              items-center
              justify-center
            "
          >
            <div className="flex flex-col text-white font-family-body font-normal gap-[8px]">
              <p className="text-[21.411px] leading-normal">Auction</p>
              <div className="flex flex-col justify-center leading-[0] text-[14.987px]">
                <p className="leading-normal">End In</p>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown Timer - Single Horizontal Card */}
        <div
          className="absolute z-[4]"
          style={{
            left: '235px',
            top: '690.84px',
            transform: 'skewX(-11.7deg)',
          }}
        >
          <div 
            className="
              backdrop-blur-[100px]
              backdrop-filter
              bg-[rgba(255,255,255,0.1)]
              glass-border-gradient
              rounded-[21.411px]
              w-[396.512px]
              h-[106.596px]
              flex
              items-center
              justify-between
              px-[48px]
              py-[24px]
            "
          >
            {/* Hours */}
            <div className="flex flex-col items-center justify-center text-white font-family-body font-normal text-nowrap">
              <p className="text-[34.257px] leading-normal whitespace-pre">17</p>
              <div className="flex flex-col justify-center leading-[0] text-[14.987px]">
                <p className="leading-normal text-nowrap whitespace-pre">Hours</p>
              </div>
            </div>

            {/* Separator : */}
            <p className="text-white text-[25.693px] font-family-body font-normal leading-normal">:</p>

            {/* Minutes */}
            <div className="flex flex-col items-center justify-center text-white font-family-body font-normal text-nowrap">
              <p className="text-[34.257px] leading-normal whitespace-pre">56</p>
              <div className="flex flex-col justify-center leading-[0] text-[14.987px]">
                <p className="leading-normal text-nowrap whitespace-pre">Minutes</p>
              </div>
            </div>

            {/* Separator : */}
            <p className="text-white text-[25.693px] font-family-body font-normal leading-normal">:</p>

            {/* Seconds */}
            <div className="flex flex-col items-center justify-center text-white font-family-body font-normal text-nowrap">
              <p className="text-[34.257px] leading-normal whitespace-pre">03</p>
              <div className="flex flex-col justify-center leading-[0] text-[14.987px]">
                <p className="leading-normal text-nowrap whitespace-pre">Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
