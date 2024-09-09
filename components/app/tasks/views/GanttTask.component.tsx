import React, { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { motion, PanInfo } from "framer-motion";
import { PiTagLight } from "react-icons/pi";

// Define the props for the GanttTask component
export type GanttTaskProps = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  priority: string;
  tags: string[];
  assignee: {
    name: string;
    avatarUrl: string;
  };
  gridColStart?: number;
  gridColEnd?: number;
  gridRow?: number;
  status: string;
  progress: number;
  color: string;
};

export const generateRandomColor = () => {
  const colors = [
    "pink-500", // Light Pink
    "primary", // Gold
    "blue-500", // Light Sky Blue
    "green-500", // Light Green
    "red-500", // Light Salmon
    "purple-500", // Light Purple
    "teal-500", // Light Teal
    "orange-500", // Light Orange
    "indigo-500", // Light Indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get a lighter shade of the given color
const getLighterColor = (color: string) => {
  switch (color) {
    case "pink-500":
      return "pink-400";
    case "primary":
      return "primary-400";
    case "blue-500":
      return "blue-400";
    case "green-500":
      return "green-400";
    case "red-500":
      return "red-400";
    case "purple-500":
      return "purple-400";
    case "teal-500":
      return "teal-400";
    case "orange-500":
      return "orange-400";
    case "indigo-500":
      return "indigo-400";
    default:
      return "gray-400"; // Fallback color
  }
};

// GanttTask component
const GanttTask: React.FC<
  GanttTaskProps & {
    onDragEnd: (event: any, info: PanInfo, task: GanttTaskProps) => void;
    onDragStart: (event: any, info: PanInfo, task: GanttTaskProps) => void;
    onDrag: (event: any, info: PanInfo, task: GanttTaskProps) => void;
  }
> = ({
  id,
  title,
  startDate,
  endDate,
  assignee,
  gridColStart,
  gridColEnd,
  gridRow,
  onDragEnd,
  onDragStart,
  onDrag,
  tags,
  priority,
  progress,
  status,
  color,
}) => {
  const gradientColor = useMemo(
    () => `from-${color} to-${getLighterColor(color)}`,
    [color]
  );

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          drag="x"
          dragMomentum={false}
          onDrag={(event, info) =>
            onDrag(event, info, {
              assignee,
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
              assignee,
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
              assignee,
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
          className={`rounded-full my-1 p-2  text-white cursor-pointer flex items-center justify-between bg-gradient-to-r ${gradientColor}`}
          style={{
            gridRow: gridRow,
            gridColumnStart: gridColStart,
            gridColumnEnd: gridColEnd,
          }}
        >
          <Avatar className="h-7 rounded-full w-7">
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback>{assignee.name[0]}</AvatarFallback>
          </Avatar>
          <span>{title}</span>
          <Badge
            variant="outline"
            className={`text-xs font-medium capitalize ${
              priority === "Haute"
                ? "text-red-600 dark:text-red-400"
                : priority === "Moyenne"
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {priority}
          </Badge>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback>{assignee.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">
              Task assigned to {assignee.name}
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
                  priority === "Haute"
                    ? "text-red-600 dark:text-red-400"
                    : priority === "Moyenne"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {priority}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-medium capitalize"
              >
                {status}
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

export default GanttTask;
