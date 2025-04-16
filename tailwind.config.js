/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubic: ["Rubic-Regular", "sans-serif"],
        rubicBold: ["Rubic-Bold", "sans-serif"],
        rubicLight: ["Rubic-Light", "sans-serif"],
        rubicMedium: ["Rubic-Medium", "sans-serif"],
        rubicSemiBold: ["Rubic-SemiBold", "sans-serif"],
        rubicExtraBold: ["Rubic-ExtraBold", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#00C2A80A", // Light translucent background version of primary
          200: "#00C2A81A", // Slightly deeper translucent variant
          300: "#00C2A8", // Main primary color
        },
        secondary: {
          100: "#007D780A",
          200: "#007D781A",
          300: "#007D78",
        },
        accent: {
          100: "#F9FAFB", // Background base
          200: "#00B8D9",
          300: "#00CFFF",
        },
        surface: {
          100: "#FFFFFF", // Main surface color
          200: "#F3F4F6", // Light mode background alternative
          300: "#1E293B", // Dark mode surface
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        text: {
          100: "#1F2937", // Primary text
          200: "#6B7280", // Secondary text
          300: "#9CA3AF", // Dark mode secondary
        },
        background: {
          100: "#F9FAFB", // Light background
          200: "#0F172A", // Dark background
        },
        error: {
          100: "#FF4C61", // Default error
          200: "#FF6B81", // Error dark
        },
        danger: "#F75555",
      },
    },
  },
  plugins: [],
};
