"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PiCalendarCheckLight, PiCalendarSlashLight, PiEyeLight, PiUserCircleGearLight, PiUserCircleLight } from "react-icons/pi";
import { ClientModel } from "@/lib/types/models";

type ProjectCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  dueDate: Date;
  client: ClientModel;
};

const ProjectCardResumed: React.FC<ProjectCardProps> = ({
  id,
  title,
  thumbnail,
  dueDate,
  client,
}) => {
  return (
    <Card className="w-full max-w-lg border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:shadow-md transition-transform duration-300 transform hover:scale-105 focus-within:scale-105 active:scale-95">
      {/* Card Header */}
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </CardTitle>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <PiUserCircleLight /> {client.fullName}
        </p>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-4 py-2 space-y-3">
        <Image
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-lg"
          width={500}
          height={300}
        />

        {/* Due Date */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-4">
          <PiCalendarSlashLight  className="w-4 h-4" />
          <span>{dueDate.toLocaleDateString()}</span>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4">
        <Link href={`/app/projects/${id}`}>
          <Button
            variant="outline"
            size="sm"
            className="text-sm flex items-center space-x-2 hover:bg-primary-100 dark:hover:bg-primary-700 focus:ring focus:ring-primary-200 dark:focus:ring-primary-700"
          >
            <PiEyeLight className="w-4 h-4" />
            <span>Voir Détails</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCardResumed;
