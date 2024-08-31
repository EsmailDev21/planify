"use client";

import React from "react";
import Image from "next/image";
import pricingBg from "../../../public/assets/images/pricing.png"; // Replace with your image path

const PricingSection = () => {
  return (
    <section className="relative py-16 bg-gray-50 dark:bg-gray-900">
      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-8">
          Nos Tarifs
        </h2>
        <p className="text-base text-slate-800 dark:text-slate-400 mb-12">
          Choisissez le plan qui correspond le mieux à vos besoins et à votre
          budget. Nous avons des options pour tous les types de projets.
        </p>

        {/* Image Container */}
        <div className="relative w-full max-w-lg mb-12">
          <Image
            src={pricingBg}
            alt="Image des Tarifs"
            width={1000} // Adjust width as needed
            height={1000} // Adjust height as needed
            className="rounded-lg "
          />
        </div>

        {/* Pricing Cards */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pricing Card 1 */}
            <div className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                Basique
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-400 mb-4">
                Idéal pour les individus et les petites équipes.
              </p>
              <div className="text-3xl font-bold text-primary mb-4">
                29 € <span className="text-base font-normal">/mois</span>
              </div>
              <ul className="list-disc list-inside mb-6 text-slate-600 dark:text-slate-400">
                <li>1 Projet</li>
                <li>10 Go de Stockage</li>
                <li>Support de Base</li>
              </ul>
              <button className="bg-primary font-semibold text-slate-950 border border-slate-950 py-2 px-4 rounded hover:bg-primary-300 transition-transform transform duration-300">
                Choisir ce Plan
              </button>
            </div>

            {/* Pricing Card 2 */}
            <div className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                Professionnel
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-400 mb-4">
                Pour les entreprises en croissance avec plus de besoins.
              </p>
              <div className="text-3xl font-bold text-primary mb-4">
                79 € <span className="text-base font-normal">/mois</span>
              </div>
              <ul className="list-disc list-inside mb-6 text-slate-600 dark:text-slate-400">
                <li>5 Projets</li>
                <li>50 Go de Stockage</li>
                <li>Support Prioritaire</li>
                <li>Analytique Avancée</li>
              </ul>
              <button className="bg-primary font-semibold text-slate-950 border border-slate-950 py-2 px-4 rounded hover:bg-primary-300 transition-transform transform duration-300">
                Choisir ce Plan
              </button>
            </div>

            {/* Pricing Card 3 */}
            <div className="bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-200 mb-4">
                Entreprise
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-400 mb-4">
                Pour les grandes organisations avec des exigences avancées.
              </p>
              <div className="text-3xl font-bold text-primary mb-4">
                149 € <span className="text-base font-normal">/mois</span>
              </div>
              <ul className="list-disc list-inside mb-6 text-slate-600 dark:text-slate-400">
                <li>Projets Illimités</li>
                <li>200 Go de Stockage</li>
                <li>Support 24/7</li>
                <li>Solutions Personnalisées</li>
              </ul>
              <button className="bg-primary font-semibold text-slate-950 border border-slate-950 py-2 px-4 rounded hover:bg-primary-300 transition-transform transform duration-300">
                Choisir ce Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
