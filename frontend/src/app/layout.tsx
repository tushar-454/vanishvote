import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vanish Vote',
  description:
    'Vanish Vote is a voting platform anyone can use to create, share, and vote on polls.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundImage: `url('https://res.cloudinary.com/karim-cloude/image/upload/v1741708211/anonymous_htqobj.svg')`,
        }}
      >
        {children}
      </body>
    </html>
  );
}
