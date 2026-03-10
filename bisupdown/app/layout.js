import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'BIS Uptime Checker — Is This Website Down or Just Me?',
  description:
    'Check if a website is down for everyone or just you. Real-time uptime monitoring with community voting. Fast, reliable, and free.',
  keywords: [
    'website down',
    'is it down',
    'uptime checker',
    'site status',
    'downtime monitor',
    'website monitor',
    'is this site down',
  ],
  authors: [{ name: 'BIS Uptime' }],
  openGraph: {
    title: 'BIS Uptime Checker — Is This Website Down?',
    description:
      'Instantly check if any website is down for everyone or just you. Powered by real-time checks and community votes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'BIS Uptime Checker',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIS Uptime Checker — Is This Website Down?',
    description:
      'Instantly check if any website is down for everyone or just you.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
