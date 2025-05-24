import localFont from 'next/font/local'

const NewStudioSans = localFont({
  src: [
    {
      path: '../public/fonts/NewStudioSans-Regular.woff2',
      weight: '400 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/NewStudioSans-RegularItalic.woff2',
      weight: '400 800',
      style: 'italic',
    },
  ],
  variable: '--font-new-studio-sans',
  display: 'swap',
})

export default NewStudioSans
