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
import { PiFlagBannerLight, PiTagLight } from "react-icons/pi";

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
    "#f43f5e", // Light Pink
    "#fbbf24", // Gold
    "#3b82f6", // Light Sky Blue
    "#22c55e", // Light Green
    "#ef4444", // Light Salmon
    "#8b5cf6", // Light Purple
    "#2dd4bf", // Light Teal
    "#fb923c", // Light Orange
    "#d946ef", // Light Indigo
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomAvatar = () => {
  const avatars = [
    "avatar1", // Light Pink
    "avatar2", // Gold
    "avatar3", // Light Sky Blue
    "avatar4", // Light Green
    "avatar5", // Light Salmon
    "avatar6", // Light Purple
    "avatar7", // Light Teal
    "avatar8", // Light Orange
    "avatar9",
    "avatar10", // Light Indigo
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
};
// Function to get a lighter shade of the given color
const getLighterColor = (color: string) => {
  switch (color) {
    case "#f43f5e":
      return "#fb7185";
    case "#fbbf24":
      return "#fcd34d";
    case "#3b82f6":
      return "#60a5fa";
    case "#22c55e":
      return "#4ade80";
    case "#ef4444":
      return "#f87171";
    case "#8b5cf6":
      return "#a78bfa";
    case "#2dd4bf":
      return "#5eead4";
    case "#fb923c":
      return "#fdba74";
    case "#d946ef":
      return "#e879f9";
    default:
      return "#94a3b8"; // Fallback color
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
  const progressStyle = {
    background: `linear-gradient(to right, ${color} ${progress}%, ${getLighterColor(
      color
    )} ${progress}%)`,
  };

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
          className={`rounded-full my-1 p-2  text-white cursor-pointer flex items-center justify-between  `}
          style={{
            gridRow: gridRow,
            gridColumnStart: gridColStart,
            gridColumnEnd: gridColEnd,
            ...progressStyle,
          }}
        >
          <Avatar className="h-7 rounded-full w-7">
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback>{assignee.name[0]}</AvatarFallback>
          </Avatar>
          <span>{title}</span>
          <Badge
            variant="default"
            className={`text-xs flex space-x-2 justify-around items-center flex-row text-white font-medium capitalize ${
              priority === "Haute"
                ? "bg-red-600 dark:text-red-400"
                : priority === "Moyenne"
                ? "bg-amber-400 dark:text-yellow-400"
                : "bg-green-600 dark:text-green-400"
            }`}
          >
            <PiFlagBannerLight className="mr-2" />
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
