import Link from 'next/link'
import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ 
  subsets: ['latin'] ,
  variable: '--font-rubik',
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans flex flex-col min-h-screen`}>
        <header className='min-h-fit flex justify-between items-center px-12 bg-teal-100'>
          <div className='font-medium py-2'><Link href={'/'}>A Developer&apos;s Journal</Link></div>
          <nav>
            <div className='hidden md:flex justify-center space-x-4'>
              <a href="/" className="font-light px-3 py-2 hover:bg-white hover:text-black">Home</a>
              <a href="/" className="font-light px-3 py-2 hover:bg-white hover:text-black">Categories</a>
              <a href="/" className="font-light px-3 py-2 hover:bg-white hover:text-black">About</a>
              <a href="/" className="font-light px-3 py-2 hover:bg-white hover:text-black">Contact</a>
            </div>
            <div className="space-y-2 md:hidden">
              <div className="w-8 h-0.5 bg-gray-500"></div>
              <div className="w-8 h-0.5 bg-gray-500"></div>
              <div className="w-8 h-0.5 bg-gray-500"></div>
            </div> 
          </nav>
        </header>
        {children}
        <footer className='h-10 flex justify-center items-center mt-auto bg-teal-600'>
          <span>A Developer&apos;s Journal @zhna123</span>
        </footer> 
      </body>
    </html>
  )
}
