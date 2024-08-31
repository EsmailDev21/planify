"use client";

import React from "react";
import Image from "next/image";
import faqImage from "../../../public/assets/images/faq.gif"; // Replace with the path to your image
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQSection = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* FAQ Content */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-200 mb-6">
            Questions Fréquemment Posées
          </h2>
          <p className="text-base text-slate-800 dark:text-slate-400 mb-6">
            Découvrez les réponses aux questions les plus courantes concernant
            notre service. Si vous avez des questions supplémentaires, n'hésitez
            pas à nous contacter.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                Qu'est-ce que votre service propose ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-400">
                Notre service offre une solution complète pour gérer vos projets
                de construction. Vous pouvez suivre les progrès, gérer les
                ressources et coordonner les équipes de manière efficace.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                Comment puis-je m'inscrire ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-400">
                Vous pouvez vous inscrire en visitant notre page d'inscription
                et en remplissant le formulaire. Vous recevrez ensuite un email
                de confirmation pour activer votre compte.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                Quels sont les modes de paiement acceptés ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-400">
                Nous acceptons les paiements par carte de crédit, PayPal et
                virement bancaire. Tous les paiements sont sécurisés.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 dark:text-slate-200">
                Puis-je essayer le service avant de m'abonner ?
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 dark:text-slate-400">
                Oui, nous proposons une période d'essai gratuite pendant
                laquelle vous pouvez explorer toutes les fonctionnalités du
                service avant de vous abonner.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Image */}
        <div className="mt-8 md:mt-0">
          <Image
            src={faqImage}
            alt="FAQ Illustration"
            width={500} // Adjust width as needed
            height={350} // Adjust height as needed
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
