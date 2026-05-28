import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tokaido Costa Rica | Uniformes de Karate de Alta Gama y Cinturones',
  description: 'Distribuidor oficial de uniformes de karate Tokaido y cinturones negros personalizados en Costa Rica. Equipamiento homologado WKF y JKA. Tradición japonesa original desde 1956.',
  keywords: 'karate uniform, karate black belt, WKF, JKA, tokaido costa rica, tokaido, karate do, cinturon negro, equipo karate, do-gi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="https://cdn11.bigcommerce.com/s-n4aq7/product_images/favicon.ico?t=1457075634" />
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
