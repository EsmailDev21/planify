import React from "react";
import planifyLogo from "../../public/assets/icons/planify-logo.png";
import Image from "next/image";
const PlanifyLogo = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <Image alt="quanta logo" src={planifyLogo} width={40} height={40} />
      <div className="mx-2">
        <p className="font-semibold text-primary text-base">Planify</p>
      </div>
    </div>
  );
};

export default PlanifyLogo;
