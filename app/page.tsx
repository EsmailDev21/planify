import AboutSection from "@/components/website/about-us/About.component";
import FAQSection from "@/components/website/faq/Faq.component";
import BaseFeatures from "@/components/website/features/BaseFeatures.component";
import Footer from "@/components/website/footer/Footer.component";
import Hero from "@/components/website/hero/Hero.component";
import Navigation from "@/components/website/navigation/Navigation.component";
import PricingSection from "@/components/website/pricing/Pricing.component";
import ScrollToTopButton from "@/components/website/utilityComponents/ScrollToTopButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <BaseFeatures />
      <FAQSection />
      <PricingSection />
      <AboutSection />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
