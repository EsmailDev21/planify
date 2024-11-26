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
import {
  PiFlagBannerLight,
  PiLinkDuotone,
  PiListPlusDuotone,
  PiPenDuotone,
  PiTagLight,
  PiTextAlignCenterDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
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

{
  /* Additional Imports */
}
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiMessageSquare, FiLink } from "react-icons/fi"; // Icons for comments and dependencies
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const GanttTask: React.FC<
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
  tags,
  priority,
  progress,
  status,
  color,
  subtasks,
  comments,
  dependencies,
  dependencyLog,
  isExpanded,
}) => {
  const progressStyle = {
    background: `linear-gradient(to right, ${color} ${progress}%, ${getLighterColor(
      color
    )} ${progress}%)`,
  };

  return (
    <Tooltip>
      <TooltipTrigger className="w-full">
        <HoverCard>
          <HoverCardTrigger>
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <motion.div
                  drag={true}
                  whileDrag={{
                    scale: 1.05,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                  // Replace with dynamic constraints if needed
                  dragElastic={0.1} // Slight elasticity for a smoother feel
                  dragMomentum={false}
                  onDrag={(event, info) =>
                    onDrag(event, info, {
                      id,
                      title,
                      startDate,
                      endDate,
                      priority,
                      progress,
                      status,
                      color,
                      teamMembers,
                      tags,
                    })
                  }
                  onDragStart={(event, info) =>
                    onDragStart(event, info, {
                      id,
                      title,
                      startDate,
                      endDate,
                      priority,
                      progress,
                      status,
                      color,
                      teamMembers,
                      tags,
                    })
                  }
                  onDragEnd={(event, info) =>
                    onDragEnd(event, info, {
                      id,
                      title,
                      startDate,
                      endDate,
                      priority,
                      progress,
                      status,
                      color,
                      teamMembers,
                      tags,
                    })
                  }
                  className="rounded-full  mt-[2px] p-2 mb-1 h-9 text-white cursor-pointer flex items-center justify-between relative"
                  style={{
                    gridRow: gridRow,
                    gridColumnStart: gridColStart,
                    gridColumnEnd: gridColEnd,
                    ...progressStyle,
                  }}
                >
                  {/* Team Members */}
                  <div className="flex -space-x-1">
                    {teamMembers.map((member: TeamMember, index: number) => (
                      <Avatar key={index} className="w-7 h-7">
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

                  {/* Task Title */}
                  <span>{title}</span>

                  {/* Priority Badge */}
                  <Badge
                    variant="default"
                    className={`text-xs flex items-center capitalize ${
                      priority === Priority.HIGH
                        ? "bg-red-600"
                        : priority === Priority.MEDIUM
                        ? "bg-amber-400"
                        : "bg-green-600"
                    }`}
                  >
                    {transFormPriority(priority)}
                  </Badge>

                  {/* Expand/Collapse Icon */}
                  {isExpanded.includes(id) ? (
                    <ChevronUp className="w-4 h-4 " />
                  ) : (
                    <ChevronDown className="w-4 h-4 " />
                  )}
                </motion.div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuGroup>
                  <ContextMenuItem className="flex flex-row space-x-2">
                    <PiPenDuotone /> <div>Update</div>
                  </ContextMenuItem>
                  <ContextMenuItem className="flex flex-row space-x-2">
                    <PiTrashDuotone /> <div>Delete</div>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuGroup>
                  <ContextMenuItem className="flex flex-row space-x-2">
                    <PiTextAlignCenterDuotone /> <div>Add Comment</div>
                  </ContextMenuItem>
                  <ContextMenuItem className="flex flex-row space-x-2">
                    <PiLinkDuotone /> <div>Add dependancy</div>
                  </ContextMenuItem>
                  <ContextMenuItem className="flex flex-row space-x-2">
                    <PiListPlusDuotone /> <div>Add Sub-tasks</div>
                  </ContextMenuItem>
                </ContextMenuGroup>
              </ContextMenuContent>
            </ContextMenu>
          </HoverCardTrigger>

          <HoverCardContent className="w-96">
            <div className="space-y-4">
              {/* Task Details */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{title}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  {`From ${startDate.toDateString()} to ${endDate.toDateString()}`}
                </div>
              </div>

              {/* Subtasks */}
              {subtasks && subtasks.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground">
                    Subtasks:
                  </h5>
                  <ul className="text-xs space-y-1">
                    {subtasks.map((subtask, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span
                          className={`block w-2 h-2 rounded-full ${
                            subtask.progress === 100
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                        {subtask.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Comments Section */}
              {comments && comments.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground">
                    Comments:
                  </h5>
                  <ul className="text-xs space-y-1">
                    {comments.slice(0, 3).map((comment, index) => (
                      <li key={index} className="truncate">
                        {comment.content}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dependency Log */}
              {dependencyLog && dependencyLog.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground">
                    Dependency Log:
                  </h5>
                  <ul className="text-xs space-y-1">
                    {dependencyLog.map((log, index) => (
                      <li key={index}>
                        {`${log.action} - ${
                          log.dependencyId
                        } at ${log.timestamp.toLocaleString()}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      </TooltipTrigger>
      <TooltipContent>
        Drag to update dates, or right click for options
      </TooltipContent>
    </Tooltip>
  );
};

export default GanttTask;
