import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photographe Professionnel Dakar | Nitro Photographie",
  description:
    "Nitro Photographie — équipe pro à Rufisque/Dakar. Événements, portraits artistes, baptêmes, EID. Réservez votre shooting.",
  keywords:
    "photographe Dakar, photographe Rufisque, shooting photo Sénégal, photographe événement, portrait artiste Dakar",
  openGraph: {
    title: "Nitro Photographie | Dakar · Sénégal",
    description:
      "Équipe photo professionnelle à Rufisque/Dakar. Événements, portraits, lifestyle.",
    type: "website",
    locale: "fr_SN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#0A0A0A] text-[#F5F5F0] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
