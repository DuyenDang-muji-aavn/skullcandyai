import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: '🏗 Workbench/PageWireframe',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
    figma: {
      component:
        'https://www.figma.com/design/V8UvDvpedWuc7biBBVPi7C/SkullCandy?node-id=121:6096',
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Wireframe Component
const PageWireframe = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <header className="h-header bg-gray-700 border-2 border-gray-500 flex items-center justify-between px-container">
        <div className="bg-gray-600 h-8 w-40 flex items-center justify-center text-xs font-mono">
          LOGO
        </div>
        <div className="bg-gray-600 h-8 w-96 flex items-center justify-center text-xs font-mono">
          NAVIGATION
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-hero bg-gray-800 border-2 border-gray-600 px-container py-10 flex flex-col lg:flex-row gap-8">
        {/* Main Content - Left Side (47%) */}
        <div className="flex-1 lg:w-[47%] flex flex-col justify-center gap-6">
          <div className="bg-gray-700 border-2 border-gray-500 p-4 flex items-center justify-center text-sm font-mono">
            <span>HERO TITLE (246px h)</span>
          </div>
          <div className="bg-gray-700 border-2 border-gray-500 p-4 h-20 flex items-center justify-center text-sm font-mono">
            <span>HERO DESCRIPTION (80px h)</span>
          </div>
          <div className="bg-gray-700 border-2 border-gray-500 p-4 h-16 w-64 flex items-center justify-center text-sm font-mono">
            <span>CTA BUTTON (67px h)</span>
          </div>
        </div>

        {/* Featured Section - Right Side (53%) */}
        <div className="flex-1 lg:w-[53%] bg-gray-700 border-2 border-gray-500 p-8 flex items-center justify-center relative">
          <div className="text-sm font-mono text-center">
            <div>FEATURED SECTION</div>
            <div className="text-xs mt-2 text-gray-400">(Floating NFT cards)</div>
            <div className="text-xs text-gray-400">(793×918px)</div>
          </div>
        </div>
      </section>

      {/* Monthly Collection Section */}
      <section className="bg-gray-800 border-2 border-gray-600 px-container py-10">
        {/* Section Header */}
        <div className="max-w-container mx-auto mb-8">
          <div className="bg-gray-700 border-2 border-gray-500 p-4 h-28 flex items-center justify-center text-sm font-mono mb-4">
            <span>SECTION TITLE + DESCRIPTION (119px h)</span>
          </div>
          <div className="bg-gray-700 border-2 border-gray-500 p-4 h-14 max-w-md mx-auto flex items-center justify-center text-sm font-mono">
            <span>SEARCH FIELD (56px h)</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-700 border-2 border-gray-500 p-4 aspect-[418/322] flex items-center justify-center text-sm font-mono"
              >
                <span>NFT CARD #{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="h-footer bg-gray-700 border-2 border-gray-500 flex items-center justify-center px-container">
        <div className="text-sm font-mono">FOOTER / CART (90px h)</div>
      </footer>
    </div>
  );
};

// Story: Default Wireframe
export const Default: Story = {
  render: () => <PageWireframe />,
  parameters: {
    docs: {
      description: {
        story: `
**Step 1.B — Page Wireframe (Boxes Only)**

Grey-box layout skeleton showing the 4 main sections:
- **Header** (91px h): Logo + Navigation
- **Hero** (1025px min-h): Main content (47%) + Featured section (53%)
- **Monthly Collection** (2628px h): Title + Search + 15 NFT cards (3-col grid)
- **Footer** (90px h): Cart bar

All dimensions use token-based classes:
- \`h-header\` → \`--header-h: 91px\`
- \`min-h-hero\` → \`--hero-h: 1025px\`
- \`px-container\` → \`--container-padding: 40px\`
- \`gap-6\` → \`--spacing-6: 48px\`

**Responsive breakpoints:**
- Desktop (lg): 3-column grid, side-by-side hero
- Tablet (md): 2-column grid, stacked hero
- Mobile: 1-column grid, stacked hero
        `,
      },
    },
  },
};

// Story: Mobile View
export const Mobile: Story = {
  render: () => (
    <div className="max-w-sm mx-auto">
      <PageWireframe />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view showing single-column grid and stacked hero layout.',
      },
    },
  },
};

// Story: Tablet View
export const Tablet: Story = {
  render: () => (
    <div className="max-w-3xl mx-auto">
      <PageWireframe />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view showing 2-column grid and stacked hero layout.',
      },
    },
  },
};

// Story: With Annotations
export const WithAnnotations: Story = {
  render: () => (
    <div className="relative">
      <PageWireframe />
      <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg text-xs font-mono text-white space-y-2 max-w-xs">
        <div className="font-bold text-green-400 mb-2">Token Usage:</div>
        <div>✅ h-header (91px)</div>
        <div>✅ min-h-hero (1025px)</div>
        <div>✅ h-footer (90px)</div>
        <div>✅ px-container (40px)</div>
        <div>✅ gap-6 (48px)</div>
        <div>✅ max-w-container (1366px)</div>
        <div className="font-bold text-yellow-400 mt-4 mb-2">Grid:</div>
        <div>✅ 3 cols (desktop)</div>
        <div>✅ 2 cols (tablet)</div>
        <div>✅ 1 col (mobile)</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Annotated wireframe showing which tokens are being used. All dimensions reference CSS variables from `tokens.css`.',
      },
    },
  },
};
