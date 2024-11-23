import type { Metadata } from "next";
import {
  Inter,
  Montserrat,
  Poppins,
  Roboto,
  Tilt_Neon,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme";
import { Toaster } from "@/components/ui/toaster";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
const font = Tilt_Neon({
  subsets: ["latin"],
  weight: "400",
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
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
