import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Speculos Café & Lounge | Safi, Avenue Hassan II',
  description: 'Specialty coffee, fresh daily pastries, breakfast combos, and express drive-thru & pickup on Avenue Hassan II in Safi, Morocco.',
  openGraph: {
    title: 'Speculos Café & Lounge | Safi, Avenue Hassan II',
    description: 'Specialty coffee, fresh daily pastries, breakfast combos, and express drive-thru & pickup on Avenue Hassan II in Safi, Morocco.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speculos Café & Lounge | Safi, Morocco',
    description: 'Specialty coffee, fresh daily pastries, breakfast combos, and express drive-thru & pickup on Avenue Hassan II in Safi, Morocco.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#FAF7F2] text-[#241A15] selection:bg-[#E0A96D]/30 selection:text-[#2B1810]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
