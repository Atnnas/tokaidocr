import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://tokaidocr.com'),
  title: 'Tokaido Costa Rica | Uniformes de Karate de Alta Gama y Cinturones',
  description: 'Distribuidor oficial de uniformes de karate Tokaido y cinturones negros personalizados en Costa Rica. Equipamiento homologado WKF y JKA. Tradición japonesa original desde 1956.',
  keywords: 'karate uniform, karate black belt, WKF, JKA, tokaido costa rica, tokaido, karate do, cinturon negro, equipo karate, do-gi, Kata Master Gold',
  alternates: {
    canonical: 'https://tokaidocr.com',
  },
  openGraph: {
    title: 'Tokaido Costa Rica | Uniformes de Karate de Alta Gama y Cinturones',
    description: 'Distribuidor oficial de uniformes de karate Tokaido y cinturones negros personalizados en Costa Rica. Equipamiento homologado WKF y JKA.',
    url: 'https://tokaidocr.com',
    siteName: 'Tokaido Costa Rica',
    locale: 'es_CR',
    type: 'website',
    images: [
      {
        url: '/tokaido_gi_showcase.png',
        width: 1200,
        height: 630,
        alt: 'Tokaido Costa Rica - Uniformes y Equipamiento Oficial',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tokaido Costa Rica | Uniformes de Karate de Alta Gama',
    description: 'Distribuidor oficial de uniformes de karate Tokaido y cinturones negros en Costa Rica.',
    images: ['/tokaido_gi_showcase.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization and WebSite Schema structured data per schema skill
const globalJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://tokaidocr.com/#organization',
      name: 'Tokaido Costa Rica',
      url: 'https://tokaidocr.com',
      logo: 'https://tokaidocr.com/tokaido.png',
      description: 'Distribuidor oficial de uniformes de karate Tokaido, cinturones personalizados y protecciones en Costa Rica. Equipamiento homologado WKF y JKA.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://tokaidocr.com/#website',
      url: 'https://tokaidocr.com',
      name: 'Tokaido Costa Rica',
      publisher: {
        '@id': 'https://tokaidocr.com/#organization',
      },
      inLanguage: 'es-CR',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
