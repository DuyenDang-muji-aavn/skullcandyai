import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6143',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
      description: 'Enable sticky positioning',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Navbar
export const Default: Story = {
  args: {
    sticky: false,
  },
};

// Sticky Navbar
export const Sticky: Story = {
  args: {
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', paddingTop: '100px' }}>
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
          <Story />
        </div>
        <div style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
          <p>Scroll down to see sticky navbar behavior</p>
          <div style={{ marginTop: '50vh' }}>
            <p>Keep scrolling...</p>
          </div>
        </div>
      </div>
    ),
  ],
};

// With Custom Class
export const CustomClass: Story = {
  args: {
    sticky: false,
    className: 'shadow-lg',
  },
};
