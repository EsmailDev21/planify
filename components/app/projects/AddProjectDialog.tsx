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
  PiPlusLight,
  PiStarLight,
  PiUserPlusLight,
} from "react-icons/pi";
import { format } from "date-fns";
import { CiEdit } from "react-icons/ci";
import { DatePicker } from "@/components/ui/date-picker";
import { useDispatch, useSelector } from "react-redux";
import { addProject, selectProjects } from "@/lib/redux/slices/projectSlice";
import { ClientModel, Priority, Status } from "@/lib/types/models";
import { Form } from "@/components/ui/form";
import { addImage } from "@/lib/redux/slices/imageGallerySlice";
import Image from "next/image";
import { transFormPriority, transFormStatus } from "./ProjectCard.component";

export function ProjectAddCard() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for handling input fields
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState(Status.IN_PROGRESS);
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState(new Date());
  const [progress, setProgress] = React.useState(0);
  const [priority, setPriority] = React.useState(Priority.MEDIUM);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState("");
  const [teamMembers, setTeamMembers] = React.useState<
    { fullName: string; profilePhoto?: string }[]
  >([]);
  const [thumbnail, setThumbnail] = React.useState("");
  const [thumbnailPreview, setThumbnailPreview] = React.useState(null);
  const [address, setAddress] = React.useState(""); // New state for address
  // State to hold preview URL
  const [client, setClient] = React.useState<ClientModel>({
    fullName: "",
    phoneNumber: "",
    profilePhoto: "",
  });
  const dispatch = useDispatch();
  const { projects } = useSelector(selectProjects);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      addProject({
        id: projects.length.toString(),
        title,
        status,
        description,
        dueDate,
        priority,
        progress,
        tags,
        teamMembers,
        thumbnail: thumbnail,
        client: client,
        address, // Include address here
        createdAt: new Date(),
      })
    );
    setOpen(false); // Close dialog or drawer after adding the project
  };

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
    updatedMembers[index].fullName = name;
    setTeamMembers(updatedMembers);
  };

  const handleAddTeamMember = () => {
    setTeamMembers([...teamMembers, { fullName: "Nouveau membre" }]);
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
        dispatch(addImage(reader.result as string)); // Dispatch the action to add the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClientPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClient((prevClient) => ({
          ...prevClient,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const content = (
    <div className="space-y-2 ">
      {/* Title and Priority */}
      <div className="flex justify-between items-center mb-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-sm mr-2 font-semibold text-slate-900 dark:text-white"
          placeholder="Titre du projet"
        />
        {/* Priority Dropdown Menu */}
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
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-full capitalize">
            {transFormStatus(status)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Statut</DropdownMenuLabel>
          <DropdownMenuSeparator />
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
          Client
        </label>
        <div className="flex justify-between space-x-2 items-center">
          <Input
            value={client.fullName}
            onChange={(e) => setClient({ ...client, fullName: e.target.value })}
            placeholder="Nom du client"
          />
          <Input
            type="number"
            value={client.phoneNumber}
            onChange={(e) =>
              setClient({ ...client, phoneNumber: e.target.value })
            }
            placeholder="Numéro de téléphone"
          />
        </div>

        <Input
          type="file"
          onChange={handleClientPhotoChange}
          accept="image/*"
        />
        {client.profilePhoto && (
          <Image
            width={500}
            height={300}
            src={client.profilePhoto}
            alt="Client Profile Preview"
            className="w-16 h-16 rounded-full mt-2"
          />
        )}
      </div>
      {/* Address Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Adresse
        </label>
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Adresse du projet"
        />
      </div>
      {/* Status Dropdown Menu */}

      {/* Thumbnail Upload */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Télécharger une vignette
        </label>
        <Input type="file" accept="image/*" onChange={handleThumbnailChange} />
        {thumbnail.length > 0 && (
          <Image
            width={500}
            height={300}
            src={thumbnail}
            alt="Vignette"
            className="w-16 h-16 rounded-full mt-2"
          />
        )}
      </div>
      {/* Description */}
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Due Date */}
      <DatePicker date={format(dueDate, "yyyy-MM-dd")} setDate={setDueDate} />
      {/* Progress */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Progression
        </label>
        <Input
          value={progress}
          type="number"
          min={0}
          max={100}
          onChange={(e) => setProgress(Number(e.target.value))}
          placeholder="Progrés"
        />
        <Progress value={progress} className="w-full" />
      </div>
      {/* Team Members */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Membres de l'équipe
        </label>
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center justify-between border p-2 rounded-md"
          >
            <Input
              value={member.fullName}
              onChange={(e) => handleUpdateTeamMember(index, e.target.value)}
              className="mr-2"
            />
            <Button
              onClick={() => handleRemoveTeamMember(index)}
              variant="outline"
              className="ml-2"
            >
              Supprimer
            </Button>
          </div>
        ))}
        <Button onClick={handleAddTeamMember} variant="outline">
          Ajouter un membre
        </Button>
      </div>
    </div>
  );

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            " bg-primary text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          )}
        >
          <PiPlusLight className="mr-2" />
          Ajouter un projet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50 h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Ajouter un projet</DialogTitle>
          <DialogDescription>
            Ajouter un nouveau projet dans votre liste de projets.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          className={cn(
            " bg-primary text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          )}
        >
          <PiPlusLight className="mr-2" />
          Ajouter un projet
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px] bg-slate-50 overflow-y-scroll">
        <DrawerHeader>
          <DrawerTitle>Ajouter un projet</DrawerTitle>
          <DrawerDescription>
            Ajouter un nouveau projet dans votre liste de projets.
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter>
          <Button type="submit" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
