import React from "react";
import { CalendarDays, ChevronDown, ChevronUp } from "lucide-react";
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
} from "../../projects/ProjectCard.component";
import { getLighterColor } from "@/lib/utils";

// Define the props for the GanttTask component
export type GanttTaskProps = TaskModel & {
  gridColStart?: number;
  gridColEnd?: number;
  gridRow?: number;
};

// GanttTask component
const GanttSubTask: React.FC<
  GanttTaskProps & {
    onDragEnd: (event: any, info: PanInfo, task: GanttTaskProps) => void;
    onDragStart: (event: any, info: PanInfo, task: GanttTaskProps) => void;
    onDrag: (event: any, info: PanInfo, task: GanttTaskProps) => void;
    onResize: (dir: string, task: any) => void;
    isExpanded: string[];
  }
> = ({
  id,
  title,
  startDate,
  endDate,
  teamMembers,
  description,
  gridColStart,
  gridColEnd,
  gridRow,
  onDragEnd,
  onDragStart,
  onDrag,
  onResize,
  tags,
  priority,
  progress,
  status,
  color,
  subtasks,
  comments,
  dependencies,
  isExpanded,
}) => {
  const progressStyle = {
    borderColor: color,
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          drag="x"
          dragMomentum={false}
          onDrag={(event, info) =>
            onDrag(event, info, {
              teamMembers,
              description,
              id,
              title,
              endDate,
              startDate,
              priority,
              tags,
              status,
              progress,
              color,
            })
          }
          onDragStart={(event, info) =>
            onDragStart(event, info, {
              teamMembers,
              description,
              id,
              title,
              endDate,
              startDate,
              priority,
              tags,
              status,
              progress,
              color,
            })
          }
          onDragEnd={(event, info) =>
            onDragEnd(event, info, {
              teamMembers,
              description,
              id,
              title,
              endDate,
              startDate,
              priority,
              tags,
              status,
              progress,
              color,
            })
          }
          className={`rounded-full  border-[2px] bg-slate-50 dark:bg-slate-900  p-2  h-9 cursor-pointer flex items-center justify-between relative `}
          style={{
            gridRow: gridRow,
            gridColumnStart: gridColStart,
            gridColumnEnd: gridColEnd,
            ...progressStyle,
          }}
        >
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 hover:rounded-full hover:h-2 hover:bg-blue-600 hover:border-2 hover:border-slate-200 cursor-ew-resize"
            onMouseDown={() =>
              onResize("left", {
                id,
                title,
                startDate,
                endDate,
                priority,
                status,
                progress,
                color,
              })
            }
          />

          {/* Right Resize Handle */}
          <div
            className="absolute right-0 top-1/2 transform  -translate-y-1/2 w-2 hover:rounded-full hover:h-2 hover:bg-blue-600 hover:border-2 hover:border-slate-200 cursor-ew-resize"
            onMouseDown={() =>
              onResize("right", {
                id,
                title,
                startDate,
                endDate,
                priority,
                status,
                progress,
                color,
              })
            }
          />
          <div className="flex -space-x-2 flex-row ">
            {teamMembers.map((member: TeamMember, index: number) => (
              <Avatar key={index} className="w-6 h-6">
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
          <span>{title}</span>
          <Badge
            variant="default"
            className={`text-xs flex space-x-2 justify-around items-center flex-row text-white font-medium capitalize ${
              priority === Priority.HIGH
                ? "bg-red-600 dark:text-red-400"
                : priority === Priority.MEDIUM
                ? "bg-amber-400 dark:text-yellow-400"
                : "bg-green-600 dark:text-green-400"
            }`}
          >
            <PiFlagBannerLight className="mr-2" />
            {transFormPriority(priority)}
          </Badge>
          {isExpanded.indexOf(id) != -1 ? (
            <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-96">
        <div className="flex justify-between space-x-4">
          <div className="flex -space-x-2 overflow-auto">
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
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <div className="text-sm max-w-32 text-muted-foreground truncate">
              {description || ""}
            </div>
            <p className="  text-sm text-muted-foreground">
              Tàche assigné à {teamMembers.map((i) => i.fullName).join(", ")}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {`From ${startDate.toDateString()} to ${endDate.toDateString()}`}
              </span>
            </div>
            {/* Priority and Status Badges */}
            <div className="flex space-x-2 mt-2">
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
              <Badge
                variant="outline"
                className="text-xs font-medium capitalize"
              >
                {transFormStatus(status)}
              </Badge>
            </div>
            {/* Tags */}
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
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default GanttSubTask;