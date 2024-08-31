"use client";

import React from "react";
import Image from "next/image";
import aboutBg from "../../../public/assets/images/aboutus.png"; // Replace with your background image path

const AboutSection = () => {
  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 py-16">
      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-200 mb-6">
            À Propos de Nous
          </h2>
          <p className="text-lg text-slate-800 dark:text-slate-400 mb-6 leading-relaxed">
            Nous sommes une équipe dédiée à transformer la gestion de vos
            projets de construction en une expérience fluide et efficace. Notre
            plateforme innovante offre des outils puissants pour optimiser la
            gestion des tâches, suivre les progrès et coordonner les équipes.
          </p>
          <p className="text-lg text-slate-800 dark:text-slate-400 mb-6 leading-relaxed">
            Avec des années d'expérience dans le secteur, notre mission est de
            fournir des solutions robustes qui répondent aux besoins uniques de
            chaque projet. Nous nous engageons à offrir une interface
            utilisateur intuitive et un support exceptionnel pour vous aider à
            réussir vos projets.
          </p>
          <button className="bg-primary font-semibold text-slate-950 border border-slate-950 py-3 px-6 rounded-lg hover:bg-primary-300 transition-transform transform duration-300">
            En Savoir Plus
          </button>
        </div>

        {/* Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -top-12 -right-12 w-full h-full bg-gradient-to-r from-primary to-transparent opacity-30 rounded-full transform rotate-45"></div>
            <Image
              src={aboutBg}
              alt="Illustration À Propos"
              width={700} // Adjust width as needed
              height={400} // Adjust height as needed
              className="rounded-lg transform scale-95 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
