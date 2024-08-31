"use client";

import React from "react";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaToolbox,
  FaClock,
} from "react-icons/fa";

// Main Features Section Component
const BaseFeatures = () => {
  return (
    <section id="base-features" className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          Pilier de la Gestion de Projets : Nos Fonctionnalités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <FeatureCard
            icon={<FaTachometerAlt className="text-primary text-3xl" />}
            title="Tableau de Bord"
            description="Obtenez une vue d'ensemble complète de vos projets en un coup d'œil. Suivez les indicateurs clés, les tâches en cours, et les performances globales à partir d'une interface centrale et intuitive."
          />
          <FeatureCard
            icon={<FaProjectDiagram className="text-primary text-3xl" />}
            title="Projets"
            description="Organisez et gérez tous vos projets, qu'ils soient en cours ou terminés. Consultez les détails de chaque projet, suivez l'avancement et attribuez des tâches de manière efficace."
          />
          <FeatureCard
            icon={<FaTasks className="text-primary text-3xl" />}
            title="Tâches"
            description="Créez, assignez et suivez les tâches liées à vos projets. Gérez les priorités, les dates d'échéance et les responsabilités pour assurer une gestion fluide et productive."
          />
          <FeatureCard
            icon={<FaUsers className="text-primary text-3xl" />}
            title="Gestion de l'Équipe"
            description="Administrez les membres de votre équipe, attribuez des rôles spécifiques et surveillez leurs performances. Facilitez la collaboration et optimisez l'efficacité de votre équipe."
          />
          <FeatureCard
            icon={<FaToolbox className="text-primary text-3xl" />}
            title="Ressources"
            description="Gérez toutes les ressources nécessaires pour vos projets, y compris les équipements et les matériaux. Assurez-vous que tout est disponible et bien organisé pour le bon déroulement des opérations."
          />
          <FeatureCard
            icon={<FaClock className="text-primary text-3xl" />}
            title="Feuilles de Temps"
            description="Suivez les heures de travail de chaque membre de l'équipe et les présences. Génération facile des rapports de temps pour assurer la précision des paiements et la gestion des ressources humaines."
          />
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300">
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default BaseFeatures;
