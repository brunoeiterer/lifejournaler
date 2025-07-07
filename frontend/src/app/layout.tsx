import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PublicEnvScript } from 'next-runtime-env';
import { AuthProvider } from "./contexts/AuthContext";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "LifeJournaler",
    description: "A lightweight open-source journal app",
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html>
            <head>
                <PublicEnvScript />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </AuthProvider>
            </body>
        </html>
    );
}