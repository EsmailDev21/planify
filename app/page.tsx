import BaseFeatures from "@/components/website/features/BaseFeatures.component";
import Hero from "@/components/website/hero/Hero.component";
import Navigation from "@/components/website/navigation/Navigation.component";
import ScrollToTopButton from "@/components/website/utilityComponents/ScrollToTopButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <BaseFeatures />
      <ScrollToTopButton />
    </>
  );
}
