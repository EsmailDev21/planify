import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
const font = Montserrat({
  subsets: ["latin"],
  weight: "300",
});

export const metadata: Metadata = {
  title: "Planify",
  description: "Planify pour la gestion des chantiers",
  creator: "Esmail Khorchani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
