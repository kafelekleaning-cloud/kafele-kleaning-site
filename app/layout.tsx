import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kafele Kleaning | Property Cleaning for Airbnb Hosts, Realtors & Managers",
  description:
    "Checklist-driven, photo-verified property cleaning for Airbnb turnovers, real estate listings, move-ins, move-outs, and property management support.",
  metadataBase: new URL("https://kafele-kleaning-site.vercel.app"),
  openGraph: {
    title: "Kafele Kleaning",
    description:
      "Property cleaning that protects reviews, showings, and reputation.",
    url: "https://kafele-kleaning-site.vercel.app/website",
    siteName: "Kafele Kleaning",
    images: [
      {
        url: "/cleaning-photos/kafele-logo.jpeg",
        width: 500,
        height: 500,
        alt: "Kafele Kleaning Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kafele Kleaning",
    description:
      "Checklist-driven, photo-verified property cleaning for Airbnb hosts, realtors, and property managers.",
    images: ["/cleaning-photos/kafele-logo.jpeg"],
  },
  icons: {
    icon: "/cleaning-photos/kafele-logo.jpeg",
    apple: "/cleaning-photos/kafele-logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
