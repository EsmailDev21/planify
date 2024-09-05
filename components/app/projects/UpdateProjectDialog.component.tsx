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
import {
  PiCalendarCheckLight,
  PiStarLight,
  PiUserPlusLight,
} from "react-icons/pi";
import { format } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { DatePicker } from "@/components/ui/date-picker";

type ProjectUpdateCardProps = {
  initialTitle: string;
  initialStatus: string;
  initialDescription: string;
  initialDueDate: Date;
  initialProgress: number;
  initialPriority: string;
  initialTags: string[];
  initialTeamMembers: { name: string; imageUrl?: string }[];
};

export function ProjectUpdateCard({
  initialTitle,
  initialStatus,
  initialDescription,
  initialDueDate,
  initialProgress,
  initialPriority,
  initialTags,
  initialTeamMembers,
}: ProjectUpdateCardProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for handling input fields
  const [title, setTitle] = React.useState(initialTitle);
  const [status, setStatus] = React.useState(initialStatus);
  const [description, setDescription] = React.useState(initialDescription);
  const [dueDate, setDueDate] = React.useState(initialDueDate);
  const [progress, setProgress] = React.useState(initialProgress);
  const [priority, setPriority] = React.useState(initialPriority);
  const [tags, setTags] = React.useState(initialTags);
  const [newTag, setNewTag] = React.useState("");
  const [teamMembers, setTeamMembers] = React.useState(initialTeamMembers);

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleUpdateTeamMember = (index: number, name: string) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index].name = name;
    setTeamMembers(updatedMembers);
  };

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "Nouveau membre" }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const content = (
    <div className="space-y-4">
      {/* Title and Priority */}
      <div className="flex justify-between items-center mb-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl mr-2 font-semibold text-slate-900 dark:text-white"
          placeholder="Titre du projet"
        />
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
      </div>

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
          <DropdownMenuItem onClick={() => setStatus("En cours")}>
            En cours
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setStatus("Terminé")}>
            Terminé
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none"
          rows={4}
          placeholder="Description du projet"
        />
      </div>

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

      {/* Due Date */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Date d'échéance
        </label>
        <DatePicker date={format(dueDate, "yyyy-MM-dd")} setDate={setDueDate} />
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

      {/* Team Members */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Membres de l'équipe
        </label>
        {teamMembers.map((member, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={member.name}
              onChange={(e) => handleUpdateTeamMember(index, e.target.value)}
              className="flex-1"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemoveTeamMember(index)}
            >
              Supprimer
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={handleAddTeamMember}>
          Ajouter un membre
        </Button>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <CiEdit size={18} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl w-full h-full overflow-scroll my-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Mettre à jour le projet</DialogTitle>
            <DialogDescription>
              Apportez des modifications aux détails de votre projet et cliquez
              sur enregistrer lorsque vous avez terminé.
            </DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter className="flex justify-between space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Enregistrer les modifications
            </Button>
            <Button variant="outline" size="sm">
              Inviter des membres
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <CiEdit size={18} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-lg w-full h-full overflow-y-scroll bg-white dark:bg-slate-800 p-4 rounded-lg  shadow-lg">
        <DrawerHeader>
          <DrawerTitle>Mettre à jour le projet</DrawerTitle>
          <DrawerDescription>
            Apportez des modifications aux détails de votre projet et cliquez
            sur enregistrer lorsque vous avez terminé.
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter className="flex justify-between space-x-2 mt-4">
          <DrawerClose asChild>
            <Button variant="outline" size="sm">
              Enregistrer les modifications
            </Button>
          </DrawerClose>
          <Button variant="outline" size="sm" onClick={handleAddTeamMember}>
            Inviter des membres
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
