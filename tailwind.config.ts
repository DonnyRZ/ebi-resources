import type { Config } from "tailwindcss";

/**
 * Tailwind design tokens for EBI Resources.
 * Values mirror the single source of truth in Design-Reference/DESIGN.md (§2)
 * and the CSS variables declared in app/globals.css (:root).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base & neutral
        ivory: "#FFFFFF", // alias for base white (see DESIGN.md §5.3 --color-ivory)
        cream: "#F7F3EC",
        beige: "#F1ECE1",
        zebra: "#FBF8F3",
        // Accent (use sparingly, <=5% area)
        gold: "#B8873B",
        bronze: "#9C6D37",
        // Ink & navy
        navy: {
          DEFAULT: "#2A2B4E",
          footer: "#0B1330",
        },
        ink: "#1C1B19",
        "text-muted": "#5A6570",
        // Lines & overlay
        border: "#E7E6EC",
        overlay: "rgba(0, 0, 0, 0.45)",
        // Data (finance only)
        "data-alert": "#C0392B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        // 8px-based scale from DESIGN.md (4px half-step)
        1: "4px",
        2: "8px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "48px",
        7: "64px",
        8: "96px",
        9: "128px",
      },
      maxWidth: {
        wide: "1200px",
        normal: "1100px",
        read: "800px",
      },
      transitionTimingFunction: {
        // easeOutQuart — the single primary easing curve used site-wide.
        quart: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        struct: "350ms",
        image: "1000ms",
        hero: "1500ms",
      },
    },
    // Sharp corners (0px) everywhere per DESIGN.md; table headers are the
    // documented exception (~4px).
    borderRadius: {
      none: "0px",
      DEFAULT: "0px",
      sm: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      "3xl": "0px",
      full: "0px",
      table: "4px",
    },
    // Depth comes from solid color & 1px borders, not drop-shadows.
    boxShadow: {
      none: "none",
      hair: "0 1px 2px rgba(0, 0, 0, 0.04)",
    },
  },
  plugins: [],
};

export default config;
