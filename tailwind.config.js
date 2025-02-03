const ts = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", ts,"./src/**/*.svelte"],
  theme: {
    extend: {},
  },
  plugins: [],
}

