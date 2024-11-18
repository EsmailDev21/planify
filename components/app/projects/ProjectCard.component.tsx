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
  PiAddressBookLight,
  PiCalendarCheckLight,
  PiEyeLight,
  PiPenLight,
  PiStarLight,
  PiTagLight,
  PiUserCheckLight,
  PiUserPlusLight,
} from "react-icons/pi";
import { ProjectUpdateCard } from "./UpdateProjectDialog.component";
import { ClientModel, Priority, Status } from "@/lib/types/models";
import Image from "next/image";

type ProjectCardProps = {
  id: string;
  title: string;
  status: Status;
  description: string;
  dueDate: Date;
  progress: number;
  priority: Priority;
  tags: string[];
  teamMembers: { fullName: string; profilePhoto?: string }[];
  thumbnail: string;
  address: string;
  createdAt: Date;
  updatedAt?: Date;
  client: ClientModel;
};

export const transFormPriority = (priority: Priority) => {
  switch (priority) {
    case Priority.HIGH:
      return "Haute";
    case Priority.MEDIUM:
      return "Moyenne";
    case Priority.LOW:
      return "Basse";
    default:
      return "Non définie";
  }
};

export const transFormStatus = (status: Status) => {
  switch (status) {
    case Status.TODO:
      return "À Faire";
    case Status.IN_PROGRESS:
      return "En cours";
    case Status.DONE:
      return "Terminé";
    default:
      return "Non définie";
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  status,
  description,
  dueDate,
  progress,
  priority,
  tags,
  teamMembers,
  thumbnail,
  address,
  createdAt,
  updatedAt,
  client,
}) => {
  return (
    <Card className="w-full max-w-7xl border border-muted rounded-lg shadow-sm  hover:shadow-md transition-transform duration-300 transform">
      {/* Card Header */}
      <CardHeader className="flex flex-col md:flex-row items-start p-4 md:space-x-4 space-y-4 md:space-y-0">
        <Image
          height={500}
          width={700}
          src={thumbnail}
          alt={`${title} Thumbnail`}
          className="object-cover rounded-lg flex-shrink-0 w-full md:w-60 lg:w-80"
        />

        <div className="flex flex-col space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white overflow-hidden text-ellipsis">
              {title}
            </CardTitle>
          </div>
          {/* Badges */}
          <div className="flex flex-wrap space-x-2">
            <Badge
              variant="outline"
              className="text-xs font-medium capitalize  dark:text-primary-300 whitespace-nowrap"
            >
              {transFormStatus(status)}
            </Badge>
            <Badge
              variant="default"
              className={`text-xs font-medium capitalize whitespace-nowrap ${
                priority === Priority.HIGH
                  ? "bg-red-400 hover:bg-red-300"
                  : priority === Priority.MEDIUM
                  ? "bg-yellow-400 hover:bg-yellow-300"
                  : "bg-green-400 hover:bg-green-300"
              }`}
            >
              {transFormPriority(priority)}
            </Badge>
          </div>
          {/* Client Information */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="font-medium text-sm h-full border-r px-2 border-slate-400 text-slate-500">
              <PiUserCheckLight className="w-4 h-4" />
            </span>
            <Avatar className="w-8 h-8">
              {client.profilePhoto ? (
                <AvatarImage src={client.profilePhoto} alt={client.fullName} />
              ) : (
                <AvatarFallback>
                  {client.fullName ? client.fullName[0] : ""}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-xs">
              <span className="font-medium">{client.fullName}</span>
              <div className="text-slate-500 dark:text-slate-400">
                {client.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-4 py-2 space-y-3">
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
          {description}
        </CardDescription>

        {/* Address */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <PiAddressBookLight className="w-4 h-4" />
          <span> {address}</span>
        </div>

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
              {member.profilePhoto ? (
                <AvatarImage src={member.profilePhoto} alt={member.fullName} />
              ) : (
                <AvatarFallback>{member.fullName[0]}</AvatarFallback>
              )}
            </Avatar>
          ))}
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="flex flex-col space-y-2 items-start justify-between p-4">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          <div>Créé le : {createdAt.toLocaleDateString()}</div>
          {updatedAt && (
            <div>Dernier Mise à jour : {updatedAt.toLocaleDateString()}</div>
          )}
        </div>
        <div className="flex flex-row space-x-2">
          <ProjectUpdateCard
            initialaddress={address}
            id={id}
            initialTitle={title}
            initialStatus={status}
            initialDescription={description}
            initialDueDate={dueDate}
            initialProgress={progress}
            initialPriority={priority}
            initialTags={tags}
            initialTeamMembers={teamMembers}
          />
          <Button
            variant="outline"
            size="sm"
            className="text-sm flex items-center space-x-2 hover:bg-primary-100 dark:hover:bg-primary-700 focus:ring focus:ring-primary-200 dark:focus:ring-primary-700"
          >
            <PiUserPlusLight className="w-4 h-4" />
            <span>Inviter des collaborateurs</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
