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
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
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
import {
  generateRandomAvatar,
  generateRandomColor,
} from "../views/GanttTask.component";
import {
  TaskModel,
  Priority,
  Status,
  QuoteItemModel,
} from "@/lib/types/models";
import {
  transFormPriority,
  transFormStatus,
} from "../../projects/ProjectCard.component";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PiPenLight } from "react-icons/pi";

type UpdateTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  setOpen: (p: boolean) => void;
  onSubmit: (task: TaskModel) => void;
  task: TaskModel;
  itemUpdater?: boolean;
  parentItemToUpdate?: QuoteItemModel;
  // Pass the existing task for updating
};

export function UpdateTaskDialog({
  isOpen,
  setOpen,
  onClose,
  onSubmit,
  task,
  itemUpdater,
  parentItemToUpdate,
}: UpdateTaskDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for handling input fields
  const [title, setTitle] = React.useState(task.title);
  const [startDate, setStartDate] = React.useState(task.startDate);
  const [endDate, setEndDate] = React.useState(task.endDate);
  const [priority, setPriority] = React.useState(task.priority);
  const [tags, setTags] = React.useState(task.tags);
  const [newTag, setNewTag] = React.useState("");
  const [assignee, setAssignee] = React.useState(task.teamMembers[0]);
  const [status, setStatus] = React.useState(task.status);
  const [progress, setProgress] = React.useState(task.progress);
  const [itemData, setItemData] = React.useState(parentItemToUpdate);
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
    setAssignee({ ...assignee, fullName: e.target.value });
  };

  const handleSubmit = () => {
    const updatedTask: TaskModel = {
      ...task,
      title,
      startDate,
      endDate,
      priority,
      tags,
      teamMembers: [assignee],
      status,
      progress,
    };
    onSubmit(updatedTask);
    onClose();
  };

  const content = (
    <div className="flex  flex-row space-x-2">
      <div className="space-y-2 w-1/2 overflow-y-auto">
        <div className="flex flex-col space-y-2 mb-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-medium text-slate-900 dark:text-white"
            placeholder="Titre de la tâche"
          />
        </div>

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
          <DatePicker
            date={format(endDate, "yyyy-MM-dd")}
            setDate={setEndDate}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" className="capitalize">
              {transFormPriority(priority)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Priorité</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setPriority(Priority.HIGH)}>
              Haute
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriority(Priority.MEDIUM)}>
              Moyenne
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPriority(Priority.LOW)}>
              Basse
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-full capitalize">
              {transFormStatus(status)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Statut</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatus(Status.TODO)}>
              À faire
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus(Status.IN_PROGRESS)}>
              En cours
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatus(Status.DONE)}>
              Terminé
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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

        <div className="flex flex-col space-y-2 mb-4">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Assigné à
          </label>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={assignee && assignee.profilePhoto}
                alt={assignee && assignee.fullName}
              />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <Input
              value={assignee && assignee.fullName}
              onChange={handleAssigneeChange}
              placeholder="Nom de l'assignee"
            />
          </div>
        </div>

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
      {itemUpdater === true && itemData != undefined && (
        <div className="space-y-2 w-1/2 flex flex-col ">
          <div>
            <label className="text-md font-medium text-slate-800 dark:text-slate-400">
              Doonées relatifs à l'item
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Pris Unitaire (en Euros)
            </label>
            <Input
              type="number"
              value={itemData?.unitPrice}
              onChange={(e) =>
                setItemData({ ...itemData, unitPrice: Number(e.target.value) })
              }
              min={0}
              max={1000000}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Qté
            </label>
            <Input
              type="number"
              value={itemData?.quantity}
              onChange={(e) =>
                setItemData({ ...itemData, quantity: Number(e.target.value) })
              }
              min={0}
              max={1000000}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              TVA (%)
            </label>
            <Input
              type="number"
              value={itemData?.tva}
              onChange={(e) =>
                setItemData({ ...itemData, tva: Number(e.target.value) })
              }
              min={0}
              max={100}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Totale
            </label>
            <Input
              type="number"
              value={itemData?.totalPrice}
              onChange={(e) =>
                setItemData({ ...itemData, totalPrice: Number(e.target.value) })
              }
              min={0}
              max={1000000000}
            />
          </div>
        </div>
      )}
    </div>
  );

  return isDesktop ? (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PiPenLight />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-50 max-w-[900px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier la tâche</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de la tâche.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Modifier</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-slate-50 overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Modifier la tâche</DrawerTitle>
          <DrawerDescription>
            Mettez à jour les informations de la tâche.
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit}>Modifier</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
