"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PiCalendarCheckLight,
  PiEyeLight,
  PiStarLight,
  PiTagLight,
  PiUserPlusLight,
} from "react-icons/pi";
import { ProjectUpdateCard } from "./UpdateProjectDialog.component";

type ProjectCardProps = {
  title: string;
  status: string; // e.g., "En cours", "Terminé"
  description: string;
  dueDate: Date;
  progress: number; // value from 0 to 100
  priority: string; // e.g., "Haute", "Moyenne", "Basse"
  tags: string[]; // Array of tags
  teamMembers: { name: string; imageUrl?: string }[]; // Array of team members
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  status,
  description,
  dueDate,
  progress,
  priority,
  tags,
  teamMembers,
}) => {
  return (
    <Card className="w-full max-w-lg border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 hover:shadow-md transition-transform duration-300 transform hover:scale-105 focus-within:scale-105 active:scale-95">
      {/* Card Header */}
      <CardHeader className="flex items-center justify-between p-4 space-x-4">
        <div className="flex-1 flex items-center space-x-4">
          <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white overflow-hidden text-ellipsis">
            {title}
          </CardTitle>
          <ProjectUpdateCard
            initialTitle={title}
            initialStatus={status}
            initialDescription={description}
            initialDueDate={dueDate}
            initialProgress={progress}
            initialPriority={priority}
            initialTags={tags}
            initialTeamMembers={teamMembers}
          />
        </div>
        <div className="flex space-x-2">
          <Badge
            variant="outline"
            className="text-xs font-medium capitalize text-primary-700 dark:text-primary-300 whitespace-nowrap"
          >
            {status}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs font-medium capitalize whitespace-nowrap ${
              priority === "Haute"
                ? "text-red-600 dark:text-red-400"
                : priority === "Moyenne"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {priority}
          </Badge>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-4 py-2 space-y-3">
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
          {description}
        </CardDescription>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs flex items-center space-x-1"
            >
              <PiTagLight className="w-3 h-3" /> <span>{tag}</span>
            </Badge>
          ))}
        </div>

        {/* Due Date */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <PiCalendarCheckLight className="w-4 h-4" />
          <span>Date limite : {dueDate.toLocaleDateString()}</span>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="mb-3" />

        {/* Team Members */}
        <div className="flex -space-x-2 overflow-auto">
          {teamMembers.map((member, index) => (
            <Avatar
              key={index}
              className="w-8 h-8 hover:scale-110 transition-transform duration-200"
            >
              {member.imageUrl ? (
                <AvatarImage src={member.imageUrl} alt={member.name} />
              ) : (
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              )}
            </Avatar>
          ))}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col space-y-2 items-start justify-between p-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-sm flex items-center space-x-2 hover:bg-primary-100 dark:hover:bg-primary-700 focus:ring focus:ring-primary-200 dark:focus:ring-primary-700"
          >
            <PiStarLight className="w-4 h-4" />
            <span>Prioriser</span>
          </Button>

          <Link href={`/projets/${title.toLowerCase().replace(/ /g, "-")}`}>
            <Button
              variant="outline"
              size="sm"
              className="text-sm flex items-center space-x-2 hover:bg-primary-100 dark:hover:bg-primary-700 focus:ring focus:ring-primary-200 dark:focus:ring-primary-700"
            >
              <PiEyeLight className="w-4 h-4" />
              <span>Voir Détails</span>
            </Button>
          </Link>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-sm flex items-center space-x-2 hover:bg-primary-100 dark:hover:bg-primary-700 focus:ring focus:ring-primary-200 dark:focus:ring-primary-700"
        >
          <PiUserPlusLight className="w-4 h-4" />
          <span>Inviter des membres</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
