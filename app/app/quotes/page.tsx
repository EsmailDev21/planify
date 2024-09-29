"use client";
import ProjectCard from "@/components/app/projects/ProjectCard.component";
import ProjectFilters from "@/components/app/projects/ProjectFilters.component";
import ProjectList from "@/components/app/projects/ProjectList.component";
import { AddQuoteDialog } from "@/components/app/quote/AddQuoteDialog";
import KanbanBoard from "@/components/app/quote/QuoteKanbanBoard.component";
import { sampleProjects } from "@/lib/mock/projects.mock";
import { setFilters } from "@/lib/redux/slices/projectSlice";
import { RootState } from "@/lib/redux/store";
import { ProjectModel } from "@/lib/types/models";
import React, { useState } from "react"; // Adjust the path based on your structure
import { useSelector } from "react-redux";

const QuotesIndex = () => {
  // Handler to update filters based on user input

  return (
    <div className=" min-h-screen flex flex-col space-y-2">
      {/* Filters Section */}
      <div className="max-w-[120px]">

      <AddQuoteDialog />
        </div>
        

      
      {/* Project List Section */}
      <KanbanBoard />

      {/* Message when no projects match the filters */}
    </div>
  );
};

export default QuotesIndex;
