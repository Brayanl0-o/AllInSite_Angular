/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        'logo-pink':'#BF245D',
        'logo-purple': '#110226',
        'logo-blue': '#0F16A6',
        'logo-cyan': '#50E8E9',
        'logo-black':'#0D0D0D',
        'cyan-d':'#4DEAEC',
        'purple-d':'#8D295B',
        'redpink-d':'#4DEAEC'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')

  ],
}

