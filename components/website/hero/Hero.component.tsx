"use client";

import Image from "next/image";
import heroImg from "../../../public/assets/images/hero.gif";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Hero() {
  const { theme } = useTheme();

  return (
    <div className="transform scale-100">
      <div className="container dark:bg-slate-950 mx-auto px-2 py-10 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/2">
          <h1 className="text-3xl text-slate-900 dark:text-slate-200 md:text-5xl font-bold leading-tight mb-2 md:mb-4">
            Gérez vos Chantiers avec Efficacité
          </h1>
          <p className="text-base text-slate-800 dark:text-slate-400 md:text-xl mb-4 md:mb-6">
            Optimisez la gestion de vos projets de construction, suivez les
            progrès, allouez les ressources et coordonnez votre équipe
            facilement.
          </p>
          <Link
            href="/dashboard"
            className="bg-primary border hover:bg-primary-300 border-slate-950 hover:text-slate-950 hover:shadow-md shadow-green-950 hover:bg-opacity-50 text-slate-900 font-semibold py-3 px-4 rounded transition-transform transform duration-300 hover:scale-110"
          >
            Commencez Maintenant
          </Link>
        </div>
        <div className="mt-8 md:mt-0">
          <Image
            src={heroImg}
            alt="Hero Image"
            width={500} // Adjusted width
            height={160} // Adjusted height
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
