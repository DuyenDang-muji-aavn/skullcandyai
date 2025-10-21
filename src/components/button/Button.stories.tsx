import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1696',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['CTA', 'Neutral', 'Stroke'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['L', 'M', 'S'],
      description: 'Size variant of the button',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Large CTA Button - Figma Node: 4:1693
export const LargeCTA: Story = {
  args: {
    style: 'CTA',
    size: 'L',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1693',
    },
  },
};

// Large Neutral Button - Figma Node: 4:1697
export const LargeNeutral: Story = {
  args: {
    style: 'Neutral',
    size: 'L',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1697',
    },
  },
};

// Large Stroke Button - Figma Node: 4:1704
export const LargeStroke: Story = {
  args: {
    style: 'Stroke',
    size: 'L',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1704',
    },
  },
};

// Medium CTA Button - Figma Node: 4:1708
export const MediumCTA: Story = {
  args: {
    style: 'CTA',
    size: 'M',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1708',
    },
  },
};

// Medium Neutral Button - Figma Node: 4:1701
export const MediumNeutral: Story = {
  args: {
    style: 'Neutral',
    size: 'M',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1701',
    },
  },
};

// Medium Stroke Button - Figma Node: 4:1712
export const MediumStroke: Story = {
  args: {
    style: 'Stroke',
    size: 'M',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:1712',
    },
  },
};

// Small CTA Button - Figma Node: 4:4509
export const SmallCTA: Story = {
  args: {
    style: 'CTA',
    size: 'S',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:4509',
    },
  },
};

// Small Neutral Button - Figma Node: 4:4505
export const SmallNeutral: Story = {
  args: {
    style: 'Neutral',
    size: 'S',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:4505',
    },
  },
};

// Small Stroke Button - Figma Node: 4:4507
export const SmallStroke: Story = {
  args: {
    style: 'Stroke',
    size: 'S',
    children: 'Explore',
  },
  parameters: {
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=4:4507',
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    style: 'CTA',
    size: 'M',
    children: 'Explore',
    disabled: false,
  },
};
