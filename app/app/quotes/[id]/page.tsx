"use client";
import ProjectCard from "@/components/app/projects/ProjectCard.component";
import ProjectFilters from "@/components/app/projects/ProjectFilters.component";
import ProjectList from "@/components/app/projects/ProjectList.component";
import QuoteDetails from "@/components/app/quote/QuoteDetails";
import { sampleProjects } from "@/lib/mock/projects.mock";
import { setFilters } from "@/lib/redux/slices/projectSlice";
import { RootState } from "@/lib/redux/store";
import { ProjectModel } from "@/lib/types/models";
import { useParams } from "next/navigation";
import React, { useState } from "react"; // Adjust the path based on your structure
import { useSelector } from "react-redux";

const QuoteDetailsIndex = () => {
  const selectAllQuotes = (state: RootState) => state.quotes.quotes;
  const quotes = useSelector(selectAllQuotes);
  const { id } = useParams();
  const data = quotes.find((quote) => quote.id === id);

  // Handler to update filters based on user input

  return (
    <div className=" min-h-screen">
      {/* Message when no projects match the filters */}
      {!data ? (
        <p className="text-center text-slate-600 dark:text-slate-400">
          Cet dévis n&apos;existe pas plus, il peut etre supprimé.
        </p>
      ) : (
        <QuoteDetails
          quote={data}
          onUpdateClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          onDownloadClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
};

export default QuoteDetailsIndex;
