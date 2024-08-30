"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaToolbox,
  FaClock,
  FaChartBar,
  FaCalendarAlt,
  FaFileAlt,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import PlanifyLogo from "@/components/logo/PlanifyLogo";
import { Separator } from "@/components/ui/separator";

type Props = {
  user?: any | null;
};

const Navigation = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer la visibilité du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 bg-white shadow-md dark:bg-slate-950 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <PlanifyLogo />

        {/* Icône Hamburger pour la vue mobile */}
        <Button
          onClick={toggleMenu}
          variant="ghost"
          className="md:hidden rounded"
          size="icon"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </Button>

        {/* Liens de navigation pour le bureau */}
        <nav className={`hidden md:flex space-x-8`}>
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-slate-950">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#dashboard"
                    >
                      <FaTachometerAlt className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Tableau de Bord
                      <p className="text-sm text-gray-500">
                        Vue d'ensemble du projet, tâches et indicateurs clés.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#projects"
                    >
                      <FaProjectDiagram className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Projets
                      <p className="text-sm text-gray-500">
                        Gérez tous les projets en cours et terminés.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#tasks"
                    >
                      <FaTasks className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Tâches
                      <p className="text-sm text-gray-500">
                        Créez, assignez et suivez les tâches des projets.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#team"
                    >
                      <FaUsers className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Gestion de l'Équipe
                      <p className="text-sm text-gray-500">
                        Gérez les équipes, leurs rôles et performances.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#resources"
                    >
                      <FaToolbox className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Ressources
                      <p className="text-sm text-gray-500">
                        Gérez les équipements et matériaux du chantier.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#timesheets"
                    >
                      <FaClock className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Feuilles de Temps
                      <p className="text-sm text-gray-500">
                        Suivi des heures de travail et des présences.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#reports"
                    >
                      <FaChartBar className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Rapports
                      <p className="text-sm text-gray-500">
                        Générez des rapports sur les projets et les
                        performances.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#calendar"
                    >
                      <FaCalendarAlt className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Calendrier
                      <p className="text-sm text-gray-500">
                        Gérer le calendrier du projet et les échéances.
                      </p>
                    </NavigationMenuLink>
                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#documents"
                    >
                      <FaFileAlt className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Documents
                      <p className="text-sm text-gray-500">
                        Stockez et gérez tous les documents du projet.
                      </p>
                    </NavigationMenuLink>

                    <NavigationMenuLink
                      className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                      href="#notifications"
                    >
                      <FaBell className="inline-block mr-2 text-primary hover:text-slate-950" />{" "}
                      Notifications
                      <p className="text-sm text-gray-500">
                        Recevez des notifications en temps réel sur les mises à
                        jour.
                      </p>
                    </NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <Separator orientation="vertical" />
              <NavigationMenuItem>
                <Link
                  href="#pricing"
                  className="text-gray-700 text-md hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  <NavigationMenuLink>Tarifs</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link
                  href="#about"
                  className="text-gray-700 text-md hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                >
                  <NavigationMenuLink>A propos de nous</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/auth/sign-in"
          className=" text-slate-900 font-semibold py-2 px-4 rounded transition-transform transform duration-300 hover:scale-x-110 hover:text-primary-300"
        >
          Connexion
        </Link>
        <Link
          href="/auth/sign-up"
          className="bg-primary border border-slate-950 text-slate-900 font-semibold py-2 px-4 rounded transition-transform transform duration-300 hover:scale-x-110 hover:bg-primary-300"
        >
          Essayer maintenant
        </Link>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-slate-950 p-4 md:hidden shadow-lg z-20">
          <ul className="space-y-4">
            {/* Répétez les mêmes liens pour le menu mobile avec la même structure */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
