/** @type {import('tailwindcss').Config} */
export default {
  content: [
    ".index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
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
      // fontSize: {
      //   sm: "clamp(0.8rem, 0.17vi + 0.76rem, 0.89rem)",
      //   base: "clamp(1rem, 0.34vi + 0.91rem, 1.19rem)",
      //   lg: "clamp(1.25rem, 0.61vi + 1.1rem, 1.58rem)",
      //   xl: "clamp(1.56rem, 1vi + 1.31rem, 2.11rem)",
      //   '2xl': "clamp(1.95rem, 1.56vi + 1.56rem, 2.81rem)",
      //   '3xl': "clamp(2.44rem, 2.38vi + 1.85rem, 3.75rem)",
      //   '4xl': "clamp(3.05rem, 3.54vi + 2.17rem, 5rem)"
      // }
    },
  },
plugins: [],
}

