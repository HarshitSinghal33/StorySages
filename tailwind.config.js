/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    './styles.css'
  ],
  theme: {
    extend: {
      boxShadow: {
        footerShadow: "inset -12px -8px 16px 0px rgba(0, 0, 0, 0.6), inset 12px 8px 16px 0px rgba(111, 111, 111, 0.47);",
        headerShadow: "0px 6px 15px rgba(0, 255, 255, 0.9)",
        story: "inset -12px -8px 16px #04040499, inset 12px 8px 16px #2f2f2f78;",
        image: "0px -8px 18px 1px rgba(0, 221, 255, 1)",
        form: "0px 6px 15px rgba(0,255,255,0.9)"
      },
      fontSize: {
        baseClamp:"clamp(18px, 2vw, 20px)",
        mediumClamp:"clamp(24px, 6vw, 32px)",
        largeClamp:"clamp(28px, 6vw, 36px)"
      }
    },
  },
plugins: [],
}

