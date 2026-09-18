import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#1B3B22", // Verde Bosque
        organic: "#2D5A27", // Verde Orgánico
        cream: "#F4F1EA", // Beige Cálido
        sun: "#E9B949", // Acento para avisos ("Próximamente")
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(0.6)" },
          "60%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pop: "pop 0.3s ease-out",
        "fade-up": "fade-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
