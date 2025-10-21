import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1716',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Controlled value',
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Search Bar
export const Default: Story = {
  args: {
    placeholder: 'Search by topics or collections',
  },
};

// Custom Placeholder
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Find your next NFT...',
  },
};

// With Initial Value
export const WithValue: Story = {
  args: {
    placeholder: 'Search by topics or collections',
    value: 'Cryptic Hacker',
  },
};

// Controlled Component
const ControlledExample = (args: typeof Default.args) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ width: '420px' }}>
      <SearchBar
        {...args}
        value={value}
        onChange={setValue}
        onSearch={(val) => console.log('Searching for:', val)}
      />
      <div style={{ marginTop: '20px', color: 'white', fontSize: '14px' }}>
        Current value: {value || '(empty)'}
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledExample,
  args: {
    placeholder: 'Type to search...',
  },
};

// With Search Handler
export const WithSearchHandler: Story = {
  args: {
    placeholder: 'Press Enter to search',
    onSearch: (value) => alert(`Searching for: ${value}`),
  },
};

// Long Placeholder
export const LongPlaceholder: Story = {
  args: {
    placeholder: 'Search by topics, collections, artists, or any keyword you want',
  },
};

// Empty Placeholder
export const NoPlaceholder: Story = {
  args: {
    placeholder: '',
  },
};
