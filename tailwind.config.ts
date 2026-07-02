import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#080A0F",
        panel: "#10141F",
        line: "#232A3A",
        violet: "#8B5CF6",
        cyan: "#22D3EE",
        emerald: "#34D399",
        amber: "#F59E0B"
      },
      boxShadow: {
        glow: "0 0 60px rgba(34, 211, 238, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
