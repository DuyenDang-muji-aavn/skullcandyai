'use client';

import React from 'react';
import { SearchBarProps } from './SearchBar.types';

/**
 * SearchBar component matching Figma design (Node 5:1711)
 * Glass morphism search input with icon
 * Single size: 420px × 56px
 * @see docs/components/SearchBar.md for specifications
 */
export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      placeholder = 'Search by topics or collections',
      value,
      onChange,
      onSearch,
      className = '',
    },
    ref
  ) => {
    const [localValue, setLocalValue] = React.useState(value || '');

    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChange?.(newValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(localValue);
    };

    return (
      <form onSubmit={handleSubmit} className={`mx-auto ${className}`}>
        {/* Figma specs: 420×56px, glass-dark bg, backdrop-blur, rounded-full, gradient stroke */}
        <div
          className="
            glass-border-gradient
            flex
            items-center
            gap-[8px]
            w-[420px]
            h-[56px]
            px-[24px]
            bg-glass-dark
            backdrop-blur-glass
            rounded-full
            transition-all
            hover:bg-glass-light
            focus-within:ring-2
            focus-within:ring-white/20
          "
        >
          {/* Search Icon - 24×24px */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden="true"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M20 20L17 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Input Field */}
          <input
            ref={ref}
            type="text"
            placeholder={placeholder}
            value={localValue}
            onChange={handleChange}
            className="
              flex-1
              bg-transparent
              border-none
              outline-none
              font-family-body
              text-[20px]
              font-normal
              text-white
              placeholder:text-white/50
            "
            aria-label="Search"
          />
        </div>
      </form>
    );
  }
);

SearchBar.displayName = 'SearchBar';
