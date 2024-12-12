/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{html,js}", // همه فایل‌های جاوااسکریپت و HTML را پوشش می‌دهد
    "./public/index.html",
  ],
  theme: {
    extend: {
      spacing: {
        "slider-height": "300px", // Example slider height
      },
      fontFamily: {
        myfont: ["MyFont", "sans-serif"], // Fallback to 'sans-serif' if custom font isn't available
      },
      colors: {
        "custom-red": "rgb(223, 49, 78)"
      },
    },
  },
  plugins: [],
  safelist: [
    "swiper",
    "swiper-wrapper",
    "swiper-slide",
    "swiper-button-next",
    "swiper-button-prev",
    "swiper-pagination",
  ],
  important: true,
};
