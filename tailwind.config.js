/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      cursor: {
        star: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='32' height='38' viewport='0 0 100 100' style='fill:black;font-size:19px;'><text y='50%'>🌟</text></svg>") 16 0,auto;`,
      },
    },
  },
  plugins: [],
};
