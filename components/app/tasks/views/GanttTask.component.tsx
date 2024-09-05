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
};
const generateRandomColor = () => {
  const colors = [
    "#FFB6C1", // Light Pink
    "#FFD700", // Gold
    "#87CEFA", // Light Sky Blue
    "#90EE90", // Light Green
    "#FFA07A", // Light Salmon
    "#ADD8E6", // Light Blue
    "#E6E6FA", // Lavender
    "#FFFACD", // Lemon Chiffon
    "#D3D3D3", // Light Gray
    "#FFC0CB", // Pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get a lighter shade of the given color
const getLighterColor = (color: string) => {
  switch (color) {
    case "#FFB6C1": // Light Pink
      return "#FFE4E9"; // Lighter Light Pink
    case "#FFD700": // Gold
      return "#FFECB3"; // Lighter Gold
    case "#87CEFA": // Light Sky Blue
      return "#BFEFFF"; // Lighter Light Sky Blue
    case "#90EE90": // Light Green
      return "#D0FFD0"; // Lighter Light Green
    case "#FFA07A": // Light Salmon
      return "#FFD5C2"; // Lighter Light Salmon
    case "#ADD8E6": // Light Blue
      return "#DDEFFF"; // Lighter Light Blue
    case "#E6E6FA": // Lavender
      return "#F5F5FF"; // Lighter Lavender
    case "#FFFACD": // Lemon Chiffon
      return "#FFFDEB"; // Lighter Lemon Chiffon
    case "#D3D3D3": // Light Gray
      return "#EDEDED"; // Lighter Light Gray
    case "#FFC0CB": // Pink
      return "#FFEBF0"; // Lighter Pink
    default:
      return "#E0E0E0"; // Default light gray if color not matched
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
}) => {
  const backgroundColor = useMemo(() => generateRandomColor(), []);

  // Calculate progress styling
  // Helper function to lighten the color

  const progressStyle = {
    background: `linear-gradient(to right, ${backgroundColor} ${progress}%, ${getLighterColor(
      backgroundColor
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
            })
          }
          className="rounded-full my-1 p-2 text-white cursor-pointer flex items-center justify-between"
          style={{
            ...progressStyle,
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
          <CalendarDays className="h-4 w-4 opacity-70" />
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
