import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const siteUrl = 'https://hitayusurgicalclinic.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hitayu Surgical Clinic | Piles, Fissure & Hernia Treatment Delhi',
  description:
    'Hitayu Surgical Clinic offers expert treatment for piles, fissure, fistula, hernia, hydrocele, pilonidal sinus and general surgery in Najafgarh, Delhi. Book your consultation today.',
  keywords: [
    'piles treatment Delhi',
    'piles doctor Najafgarh',
    'fistula treatment Delhi',
    'fissure specialist Delhi',
    'hernia surgery Delhi',
    'hydrocele treatment Delhi',
    'pilonidal sinus treatment Delhi',
    'laser piles surgery Delhi',
    'anorectal surgeon Delhi',
    'general surgeon Najafgarh',
    'ayurvedic surgery Delhi',
    'Dr Hitesh Dagar',
    'Dr Hitesh Dadar',
    'Hitayu Surgical Clinic',
    'surgical clinic Najafgarh',
    'best piles doctor Delhi',
  ],
  authors: [{ name: 'Hitayu Surgical Clinic' }],
  creator: 'Hitayu Surgical Clinic',
  publisher: 'Hitayu Surgical Clinic',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Hitayu Surgical Clinic',
    title: 'Hitayu Surgical Clinic | Advanced Surgical Care',
    description:
      'Expert treatment for Piles, Fissure, Fistula, Hernia, Hydrocele & General Surgery in Najafgarh, Delhi.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hitayu Surgical Clinic - Expert Surgical Care in Najafgarh, Delhi',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hitayu Surgical Clinic | Piles, Fissure & Hernia Treatment Delhi',
    description:
      'Expert treatment for Piles, Fissure, Fistula, Hernia, Hydrocele & General Surgery in Najafgarh, Delhi.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'Z4MOcJ-gQcuXI_7lEATuXr6Z6wLfd5AMMtETxfbXeKY',
  },
  icons: {
    icon: [
      {
        url: '/favicon-logo.png',
        type: 'image/png',
      },
      {
        url: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    shortcut: '/favicon-logo.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2B7ABB',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Hitayu Surgical Clinic',
    description:
      'Hitayu Surgical Clinic offers expert treatment for piles, fissure, fistula, hernia, hydrocele, pilonidal sinus and general surgery in Najafgarh, Delhi.',
    url: siteUrl,
    telephone: '+918447119161',
    email: 'hitayusurgicals2026@gmail.com',
    image: `${siteUrl}/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Prem Nagar, Najafgarh',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110043',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6092,
      longitude: 76.9798,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    medicalSpecialty: [
      'Colorectal Surgery',
      'General Surgery',
      'Ano-Rectal Surgery',
    ],
    doctor: {
      '@type': 'Physician',
      name: 'Dr. Hitesh Dagar',
      description: 'BAMS, MS (Surgery) - Specialist in Colorectal & General Surgery',
    },
    sameAs: [
      siteUrl,
    ],
  }

  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ── Google Analytics ──────────────────────────────────────────────
            Replace GA_MEASUREMENT_ID below with your G-XXXXXXXXXX ID once
            you have it from GA4 → Admin → Data Streams.
        ──────────────────────────────────────────────────────────────────── */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" /> */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID', { page_path: window.location.pathname });
            `,
          }}
        /> */}
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
