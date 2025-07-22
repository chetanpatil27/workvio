import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/providers/redux-provider";
import CustomThemeProvider from "@/components/providers/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workvio - Project Management Platform",
  description: "A modern project and sprint management platform inspired by Jira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
