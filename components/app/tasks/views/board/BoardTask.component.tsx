import React from "react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { motion, PanInfo } from "framer-motion";
import { PiFlagBannerLight, PiTagLight } from "react-icons/pi";
import { Priority, TaskModel, TeamMember } from "@/lib/types/models";
import {
  transFormPriority,
  transFormStatus,
} from "@/components/app/projects/ProjectCard.component";

// Define the props for the BoardTask component
export type BoardTaskProps = TaskModel & {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (event: React.TouchEvent<HTMLDivElement>) => void;
};

// BoardTask component
const BoardTask: React.FC<BoardTaskProps> = ({
  id,
  title,
  startDate,
  endDate,
  teamMembers,
  description,
  priority,
  progress,
  status,
  color,
  tags,
  onDragEnd,
  onDragStart,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          data-id={id}
          draggable
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className={`p-4  shadow-md rounded-lg mb-4 cursor-pointer border-l-4`}
          style={{ borderLeftColor: color }}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold">{title}</span>
            <Badge
              variant="default"
              className={`text-xs flex items-center  font-medium capitalize ${
                priority === Priority.HIGH
                  ? "bg-red-600 dark:text-red-400"
                  : priority === Priority.MEDIUM
                  ? "bg-amber-400 dark:text-yellow-400"
                  : "bg-green-600 dark:text-green-400"
              }`}
            >
              <PiFlagBannerLight className="mr-1" />
              {transFormPriority(priority)}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground mb-2">
            {description || "No description available"}
          </div>
          <div className="flex -space-x-2 overflow-hidden mb-2">
            {teamMembers.map((member: TeamMember, index: number) => (
              <Avatar
                key={index}
                className="w-8 h-8 hover:scale-110 transition-transform duration-200"
              >
                {member.profilePhoto ? (
                  <AvatarImage
                    src={member.profilePhoto}
                    alt={member.fullName}
                  />
                ) : (
                  <AvatarFallback>{member.fullName[0]}</AvatarFallback>
                )}
              </Avatar>
            ))}
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-xs text-muted-foreground">{`${startDate.toDateString()} - ${endDate.toDateString()}`}</span>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">
            {description || "No description available"}
          </p>
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              className={`text-xs font-medium capitalize ${
                priority === Priority.HIGH
                  ? "text-red-600 dark:text-red-400"
                  : priority === Priority.MEDIUM
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {transFormPriority(priority)}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium capitalize">
              {transFormStatus(status)}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
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
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default BoardTask;
