"use client";

import Link from "next/link";
import { useTheme } from "next-themes"; // Update with your logo image path
import PlanifyLogo from "@/components/logo/PlanifyLogo";
import {
  PiFacebookLogoLight,
  PiInstagramLogoLight,
  PiLinkedinLogoLight,
  PiTwitterLogoLight,
} from "react-icons/pi";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-slate-900 rounded-t-md dark:bg-slate-950 text-slate-200 dark:text-slate-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <PlanifyLogo />
          <p className="text-base text-slate-400 dark:text-slate-400 mb-4">
            © 2024 Planify. Tous droits réservés.
          </p>
          <p className="text-base text-slate-400 dark:text-slate-400 mb-4">
            Optimisez vos projets de construction avec notre solution innovante.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-slate-300 dark:text-slate-200 mb-4">
            Liens Rapides
          </h3>
          <div className="space-y-2 space-x-2">
            <Link href="/about" className="hover:underline">
              À propos
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/services" className="hover:underline">
              Nos Services
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/faq" className="hover:underline">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:underline">
              Politique de Confidentialité
            </Link>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-slate-300 dark:text-slate-200 mb-4">
            Contactez-nous
          </h3>
          <p className="text-base text-slate-400 dark:text-slate-400 mb-2">
            Email:{" "}
            <a href="mailto:contact@planify.com" className="hover:underline">
              contact@planify.com
            </a>
          </p>
          <p className="text-base text-slate-400 dark:text-slate-400 mb-2">
            Téléphone:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +1 (234) 567-890
            </a>
          </p>
          <p className="text-base text-slate-400 dark:text-slate-400">
            Adresse: 123 Rue de l&apos;Innovation, Paris, France
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-semibold text-slate-300 dark:text-slate-200 mb-4">
            Suivez-nous
          </h3>
          <div className="flex space-x-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-slate-400 hover:text-slate-300"
            >
              <PiFacebookLogoLight />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-slate-400 hover:text-slate-300"
            >
              <PiTwitterLogoLight />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-slate-400 hover:text-slate-300"
            >
              <PiLinkedinLogoLight />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-slate-400 hover:text-slate-300"
            >
              <PiInstagramLogoLight />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
