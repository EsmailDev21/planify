"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { generateRandomAvatar, generateRandomColor } from "../views/GanttTask.component";
import {TaskModel,Priority,Status} from "@/lib/types/models"
type AddTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  setOpen: (p: boolean) => void;
  onSubmit: (task: TaskModel) => void;
  id: string;
};

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

export function AddTaskDialog({
  isOpen,
  setOpen,
  onClose,
  onSubmit,
  id,
}: AddTaskDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for handling input fields

  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [priority, setPriority] = React.useState("Moyenne");
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [assignee, setAssignee] = React.useState<{
    name: string;
    avatarUrl: string;
  }>({
    name: "Assigné",
    avatarUrl: "",
  });
  const [status, setStatus] = React.useState("À faire");
  const [progress, setProgress] = React.useState(0);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignee({ ...assignee, name: e.target.value });
  };
  const taskId = React.useId();

  const handleSubmit = () => {
    const newTask: TaskModel = {
      id,
      title,
      startDate,
      endDate,
      priority:priority="Haute"?Priority.HIGH:priority="Moyenne"?Priority.MEDIUM:Priority.LOW,
      description:"",
      tags,
      teamMembers:[{
        name:assignee.name,
        avatarUrl:`/assets/images/avatars/${generateRandomAvatar()}.png`
      }],
      status:status="À faire"?Status.TODO:status="En cours"?Status.IN_PROGRESS:Status.DONE,
      progress,
      color: generateRandomColor(),
    };
    onSubmit(newTask);
    onClose();
  };

  const content = (
    <div className="space-y-2 overflow-y-scroll">
      {/* ID and Title */}
      <div className="flex flex-col space-y-2 mb-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm font-medium text-slate-900 dark:text-white"
          placeholder="Titre de la tâche"
        />
      </div>

      {/* Start and End Dates */}
      <div className="flex flex-col space-y-2 mb-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Date de début
        </label>
        <DatePicker
          date={format(startDate, "yyyy-MM-dd")}
          setDate={setStartDate}
        />

        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Date de fin
        </label>
        <DatePicker date={format(endDate, "yyyy-MM-dd")} setDate={setEndDate} />
      </div>

      {/* Priority Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="default" className="capitalize">
            {priority}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Priorité</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setPriority("Haute")}>
            Haute
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPriority("Moyenne")}>
            Moyenne
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setPriority("Basse")}>
            Basse
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full capitalize">
            {status}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Statut</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setStatus("À faire")}>
            À faire
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatus("En cours")}>
            En cours
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatus("Terminé")}>
            Terminé
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Tags */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs flex items-center space-x-1"
              onClick={() => handleRemoveTag(index)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder="Ajouter un nouveau tag"
        />
      </div>

      {/* Assignee */}
      <div className="flex flex-col space-y-2 mb-4">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Assigné à
        </label>
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={assignee.avatarUrl} alt={assignee.name} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <Input
            value={assignee.name}
            onChange={handleAssigneeChange}
            placeholder="Nom de l'assignee"
          />
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Progrès
        </label>
        <Input
          type="number"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          min={0}
          max={100}
        />
        <Progress value={progress} />
      </div>
    </div>
  );

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Nouveau tâche
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-50 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
          <DialogDescription>
            Remplissez les informations suivantes pour ajouter une nouvelle
            tâche.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Nouveau tâche
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-slate-50 overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Ajouter une nouvelle tâche</DrawerTitle>
          <DrawerDescription>
            Remplissez les informations suivantes pour ajouter une nouvelle
            tâche.
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
