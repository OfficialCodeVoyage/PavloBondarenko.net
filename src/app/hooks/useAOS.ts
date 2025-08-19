// Custom hook for AOS (Animate On Scroll) initialization
// This hook centralizes AOS initialization to avoid code duplication

import { useEffect } from 'react';
import AOS, { AosOptions } from 'aos';
import 'aos/dist/aos.css';

// Use AOS's own type definition instead of creating our own
type AOSOptions = AosOptions;

/**
 * Custom hook to initialize AOS (Animate On Scroll)
 * @param options - Optional AOS configuration options
 * @param deps - Optional dependency array to re-initialize AOS
 */
export const useAOS = (options?: AOSOptions, deps: any[] = []): void => {
  useEffect(() => {
    // Default options with correct type
    const defaultOptions: AOSOptions = {
      duration: 1500,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
      mirror: false,
      anchorPlacement: 'top-bottom' as any, // Type assertion needed due to AOS type definitions
    };

    // Merge default options with provided options
    const finalOptions = { ...defaultOptions, ...options };

    // Initialize AOS
    AOS.init(finalOptions);

    // Refresh AOS on route changes or when content updates
    AOS.refresh();

    // Cleanup function
    return () => {
      // AOS doesn't have a destroy method, but we can refresh on cleanup
      // to ensure animations are reset for the next component
      AOS.refresh();
    };
  }, deps); // Re-initialize when dependencies change
};

/**
 * Hook to refresh AOS animations
 * Useful when content is dynamically added to the page
 */
export const useAOSRefresh = (): (() => void) => {
  return () => AOS.refresh();
};

// Export default configuration for consistency
export const DEFAULT_AOS_CONFIG: AOSOptions = {
  duration: 1500,
  once: true,
  offset: 100,
  easing: 'ease-in-out',
  mirror: false,
  anchorPlacement: 'top-bottom' as any, // Type assertion needed due to AOS type definitions
};