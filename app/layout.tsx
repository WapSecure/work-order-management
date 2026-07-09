import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers/Providers';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Providers>
          <div className="container mx-auto px-4 py-2 flex justify-end">
            <LanguageSwitcher />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
