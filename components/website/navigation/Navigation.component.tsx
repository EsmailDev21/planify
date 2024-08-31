"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaProjectDiagram,
  FaUsers,
  FaToolbox,
  FaChartBar,
  FaCalendarAlt,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // Import Shadcn Dropdown Menu components

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import PlanifyLogo from "@/components/logo/PlanifyLogo";
import { Separator } from "@/components/ui/separator";

type Props = {
  user?: any | null;
};

const Navigation = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-10 p-4 bg-white shadow-md dark:bg-slate-950 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <PlanifyLogo />

        {/* Hamburger Icon for Mobile View */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden rounded"
              size="icon"
              onClick={toggleMenu}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <Collapsible>
              <CollapsibleTrigger>
                <span>Fonctionnalités</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Link href="#dashboard" className="flex items-center gap-2">
                  <FaTachometerAlt className="text-primary" />
                  Tableau de Bord
                </Link>

                <Link href="#projects" className="flex items-center gap-2">
                  <FaProjectDiagram className="text-primary" />
                  Projets et Tâches
                </Link>

                <Link href="#team" className="flex items-center gap-2">
                  <FaUsers className="text-primary" />
                  Gestion de l'Équipe
                </Link>

                <Link href="#resources" className="flex items-center gap-2">
                  <FaToolbox className="text-primary" />
                  Ressources et Temps
                </Link>

                <Link href="#reports" className="flex items-center gap-2">
                  <FaChartBar className="text-primary" />
                  Rapports et Documents
                </Link>

                <Link href="#calendar" className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  Calendrier et Notifications
                </Link>
              </CollapsibleContent>
            </Collapsible>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="#tarifs">Tarifs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#about-us" className="flex items-center gap-2">
                A propos de nous
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/app" className="font-semibold">
                Connexion
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/app"
                className="bg-primary border border-slate-950 text-slate-900 font-semibold py-2 px-4 rounded hover:bg-primary-300 transition-transform transform duration-300"
              >
                Essayer maintenant
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Desktop Navigation Links */}
        <nav className={`hidden md:flex space-x-8`}>
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-slate-950">
                  Fonctionnalités
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {/* Navigation Links */}
                    {[
                      {
                        icon: (
                          <FaTachometerAlt className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Tableau de Bord",
                        description:
                          "Vue d'ensemble du projet, gestion des tâches et des équipes.",
                        href: "#dashboard",
                      },
                      {
                        icon: (
                          <FaProjectDiagram className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Projets et Tâches",
                        description:
                          "Créez, assignez et suivez les projets et tâches en temps réel.",
                        href: "#projects",
                      },
                      {
                        icon: (
                          <FaUsers className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Gestion de l'Équipe",
                        description:
                          "Gérez les membres, rôles et performances de votre équipe.",
                        href: "#team",
                      },
                      {
                        icon: (
                          <FaToolbox className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Ressources et Temps",
                        description:
                          "Suivi des équipements, feuilles de temps et disponibilités.",
                        href: "#resources",
                      },
                      {
                        icon: (
                          <FaChartBar className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Rapports et Documents",
                        description:
                          "Générez des rapports complets et gérez vos documents.",
                        href: "#reports",
                      },
                      {
                        icon: (
                          <FaCalendarAlt className="inline-block mr-2 text-primary hover:text-slate-950" />
                        ),
                        title: "Calendrier et Notifications",
                        description:
                          "Planifiez les échéances et recevez des notifications en temps réel.",
                        href: "#calendar",
                      },
                    ].map((item, index) => (
                      <NavigationMenuLink
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg border hover:scale-105 border-slate-300 dark:border-slate-300 p-4 text-center hover:border-slate-950 dark:hover:border-gray-600 transition-all duration-300"
                        href={item.href}
                      >
                        {item.icon} {item.title}
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <Separator orientation="vertical" />

              {/* Direct Links for Tarifs and À propos de nous */}
              <NavigationMenuItem>
                <Link href="#tarifs">
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " hover:text-slate-950"
                    }
                  >
                    Tarifs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <Separator orientation="vertical" />

              <NavigationMenuItem>
                <Link href="#about-us">
                  <NavigationMenuLink
                    className={
                      navigationMenuTriggerStyle() + " hover:text-slate-950"
                    }
                  >
                    A propos de nous
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/app"
          className="text-slate-900 font-semibold py-2 px-4 rounded transition-transform transform duration-300 hover:scale-x-110 hover:text-primary-300"
        >
          Connexion
        </Link>
        <Link
          href="/app"
          className="bg-primary border border-slate-950 text-slate-900 font-semibold py-2 px-4 rounded transition-transform transform duration-300 hover:scale-x-110 hover:bg-primary-300"
        >
          Essayer maintenant
        </Link>
      </div>

      {/* Mobile Menu */}
    </header>
  );
};

export default Navigation;
