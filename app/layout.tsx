import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ErrorBoundary } from "@/lib/error-handling";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marrow - Turn Your LinkedIn Network Into Revenue",
  description: "Get paid when people want to connect with you. Set your price, control access, earn on your terms.",
  keywords: "LinkedIn monetization, professional network, paid consultations, expertise monetization",
  authors: [{ name: "Marrow" }],
  openGraph: {
    title: "Marrow - Turn Your LinkedIn Network Into Revenue",
    description: "Get paid when people want to connect with you. Set your price, control access, earn on your terms.",
    url: "https://marrow.ideatoads.com",
    siteName: "Marrow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Marrow - LinkedIn Monetization Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrow - Turn Your LinkedIn Network Into Revenue",
    description: "Get paid when people want to connect with you. Set your price, control access, earn on your terms.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
{/* Temporarily remove these until we create the icons */}
{/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
{/* <link rel="icon" href="/icon.svg" type="image/svg+xml" /> */}
{/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
{/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#0a66c2" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <ToastProvider>
              <AnalyticsProvider>
                {children}
              </AnalyticsProvider>
            </ToastProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}