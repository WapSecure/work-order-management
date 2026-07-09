import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Work Order Management',
  description: 'Manage work orders efficiently',
  keywords: 'work orders, management, tasks, priority, status',
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Work Order Management',
    description: 'Manage work orders efficiently',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
