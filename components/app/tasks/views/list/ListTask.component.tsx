import React from "react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { PiFlagBannerLight, PiTagLight } from "react-icons/pi";
import { Priority, TaskModel, TeamMember } from "@/lib/types/models";
import {
  transFormStatus,
  transFormPriority,
} from "@/components/app/projects/ProjectCard.component";

// Define the props for the ListTask component
export type ListTaskProps = TaskModel & {
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
};

// ListTask component
const ListTask: React.FC<ListTaskProps> = ({
  id,
  title,
  startDate,
  endDate,
  teamMembers,
  description,
  priority,
  tags,
  status,
  progress,
  color,
}) => {
  return (
    <motion.div
      drag="y"
      dragMomentum={false}
      className="flex items-center p-4 my-2 bg-white shadow rounded-md cursor-pointer hover:bg-gray-50 transition-all"
    >
      {/* Avatar Group */}
      <div className="flex -space-x-2 overflow-auto pr-4">
        {teamMembers.map((member: TeamMember, index: number) => (
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

      {/* Task Information */}
      <div className="flex-1 pl-4">
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 truncate">{description}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
          {`From ${startDate.toDateString()} to ${endDate.toDateString()}`}
        </div>
      </div>

      {/* Badges Section */}
      <div className="flex flex-col items-end space-y-1">
        {/* Priority Badge */}
        <Badge
          variant="default"
          className={`text-xs flex space-x-2 items-center text-white font-medium capitalize ${
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

        {/* Status Badge */}
        <Badge variant="outline" className="text-xs font-medium capitalize">
          {transFormStatus(status)}
        </Badge>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-1">
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
    </motion.div>
  );
};

export default ListTask;
