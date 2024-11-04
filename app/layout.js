import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navigation } from "@/components/shared/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { font } from "./fonts";
import { Toaster } from "sonner";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TaskFlow",
  description:
    "Free personal task management tool to organize your work and boost productivity",
  applicationCategory: "Productivity",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Khaleel Alhaji",
    url: "https://github.com/khaleelibraheem",
  },
};

export const metadata = {
  metadataBase: new URL("https://taskflow.vercel.app"),
  canonical: "https://taskflow.vercel.app",

  title: {
    template: "%s | TaskFlow",
    default: "TaskFlow - Simple Personal Task Management",
  },
  description:
    "Free personal task management tool to organize your work and boost productivity. Simple, secure, and built for individual use.",

  keywords: [
    "task management",
    "personal productivity",
    "todo list",
    "task organizer",
    "personal projects",
    "time management",
    "productivity tool",
  ],

  authors: [
    {
      name: "Khaleel Alhaji",
      url: "https://github.com/khaleelibraheem",
    },
  ],

  creator: "Khaleel Alhaji",

  alternates: {
    languages: {
      "en-US": "https://taskflow.vercel.app",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TaskFlow - Simple Personal Task Management",
    description:
      "Free personal task management tool to organize your work and boost productivity. Simple, secure, and built for individual use.",
    siteName: "TaskFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow - Personal Task Management",
      },
    ],
    article: {
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: "2024-01-01T00:00:00.000Z",
      authors: ["Khaleel Alhaji"],
    },
  },

  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Simple Personal Task Management",
    description:
      "Free personal task management tool to organize your work and boost productivity",
    images: ["/og-image.png"],
    creator: "@khaleelalhaji",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={font.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`antialiased font-sans ${font.className}`}
        suppressHydrationWarning
      >
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          dynamic
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
