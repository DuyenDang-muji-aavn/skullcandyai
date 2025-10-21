export interface SectionHeadingProps {
  /** Main title text (displayed in Orbitron, 38px, uppercase) */
  title: string;
  
  /** Optional description text (supports multi-line, displayed in Outfit, 20px) */
  description?: string;
  
  /** Text alignment */
  align?: 'left' | 'center';
  
  /** Optional search placeholder text (default: "Search by topics or collections") */
  searchPlaceholder?: string;
  
  /** Search query change handler for live filtering */
  onSearchChange?: (query: string) => void;
  
  /** Additional CSS classes */
  className?: string;
}
