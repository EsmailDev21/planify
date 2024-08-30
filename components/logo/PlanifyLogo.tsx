import React from "react";
import planifyLogo from "../../public/assets/icons/planify-logo.png";
import Image from "next/image";

const PlanifyLogo = () => {
  return (
    <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 ease-in-out">
      <Image
        alt="Planify logo"
        src={planifyLogo}
        width={40} // Increased size for better visibility
        height={40} // Increased size for better visibility
        className="rounded-full" // Added border and rounded effect
      />
      <p className="font-bold text-primary text-lg sm:text-xl md:text-2xl transition-colors duration-300 ease-in-out hover:text-secondary">
        Planify
      </p>
    </div>
  );
};

export default PlanifyLogo;
