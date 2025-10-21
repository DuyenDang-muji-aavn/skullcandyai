export interface SearchBarProps {
  /** Placeholder text */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Change handler for controlled mode */
  onChange?: (value: string) => void;
  /** Search submission handler */
  onSearch?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
}
