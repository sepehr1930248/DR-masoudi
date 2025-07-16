import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "دکتر بهروز مسعودی - متخصص زیبایی و درمان‌های پوستی",
  description: "کلینیک زیبایی دکتر بهروز مسعودی - ارائه خدمات تخصصی زیبایی، درمان‌های پوستی و جوانسازی صورت با بهترین کیفیت",
  keywords: "دکتر مسعودی, کلینیک زیبایی, درمان پوست, جوانسازی صورت, زیبایی",
  authors: [{ name: "Dr. Behrooz Masoudi" }],
  openGraph: {
    title: "دکتر بهروز مسعودی - متخصص زیبایی و درمان‌های پوستی",
    description: "کلینیک زیبایی دکتر بهروز مسعودی - ارائه خدمات تخصصی زیبایی، درمان‌های پوستی و جوانسازی صورت",
    type: "website",
    locale: "fa_IR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      <body className={`${inter.variable} font-vazir antialiased`}>
        {children}
      </body>

    </html>
  );
}
