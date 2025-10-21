import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(<Button>Explore</Button>);
      expect(screen.getByText('Explore')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button className="custom-class">Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Style Variants', () => {
    it('renders CTA style correctly', () => {
      render(<Button style="CTA">CTA Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders Neutral style correctly', () => {
      render(<Button style="Neutral">Neutral Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders Stroke style correctly', () => {
      render(<Button style="Stroke">Stroke Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders Large size correctly', () => {
      render(
        <Button size="L" style="CTA">
          Large
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders Medium size correctly', () => {
      render(
        <Button size="M" style="CTA">
          Medium
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders Small size correctly', () => {
      render(
        <Button size="S" style="CTA">
          Small
        </Button>
      );
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('All 9 Variant Combinations', () => {
    const styles = ['CTA', 'Neutral', 'Stroke'] as const;
    const sizes = ['L', 'M', 'S'] as const;

    styles.forEach((style) => {
      sizes.forEach((size) => {
        it(`renders ${size} ${style} variant`, () => {
          render(
            <Button style={style} size={size}>
              {`${size} ${style}`}
            </Button>
          );
          const button = screen.getByRole('button');
          expect(button).toBeInTheDocument();
          expect(button).toHaveTextContent(`${size} ${style}`);
        });
      });
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<Button>Accessible Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('can be disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Button with Ref</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('accepts aria-label', () => {
      render(<Button aria-label="Custom label">Icon</Button>);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });
  });

  describe('Slot Composition', () => {
    it('renders as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });
  });

  describe('HTML Attributes', () => {
    it('accepts onClick handler', () => {
      let clicked = false;
      render(<Button onClick={() => (clicked = true)}>Click</Button>);
      const button = screen.getByRole('button');
      button.click();
      expect(clicked).toBe(true);
    });

    it('accepts type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('accepts data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>);
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });
  });
});
