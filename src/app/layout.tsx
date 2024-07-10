import { Inter } from 'next/font/google'; // Adjust import path as per your project
import './globals.css';
import React from 'react';
import Navbar from './Navbar/page';

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next App',
  description: 'Next.js starter app',
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {

  return (
    
    <html lang="en">
      
      <body className={inter.className}><Navbar/>{children}</body>
    </html>
   
  );
}
