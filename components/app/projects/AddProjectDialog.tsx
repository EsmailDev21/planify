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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
    //setOpen(false);
    router.push("/app/projects"); // Close dialog or drawer after adding the project
  };

  const handleAddTag = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    <div className="container mx-auto p-4 h-full overflow-y-auto">
      <h1 className="text-xl font-bold mb-4">Add Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Project Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Priority
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="capitalize">
                  {transFormPriority(priority)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setPriority(Priority.HIGH)}>
                  High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriority(Priority.MEDIUM)}>
                  Medium
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPriority(Priority.LOW)}>
                  Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Status
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="default" className="capitalize">
                  {transFormStatus(status)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatus(Status.IN_PROGRESS)}>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatus(Status.DONE)}>
                  Done
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Due Date */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Due Date
            </label>
            <DatePicker
              date={format(dueDate, "yyyy-MM-dd")}
              setDate={setDueDate}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Description
          </label>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Thumbnail
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {thumbnail && (
            <Image
              width={500}
              height={300}
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-16 h-16 rounded-full mt-2"
            />
          )}
        </div>

        {/* Client Info */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Client Information
          </label>
          <div className="flex space-x-2">
            <Input
              value={client.fullName}
              onChange={(e) =>
                setClient({ ...client, fullName: e.target.value })
              }
              placeholder="Client Name"
            />
            <Input
              type="number"
              value={client.phoneNumber}
              onChange={(e) =>
                setClient({ ...client, phoneNumber: e.target.value })
              }
              placeholder="Phone Number"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleClientPhotoChange}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Tags
          </label>
          <div className="flex items-center space-x-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap space-x-1 mt-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                onClick={() => handleRemoveTag(index)}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="flex flex-row space-x-2 w-1/4 items-end">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Team Members
            </label>
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={member.fullName}
                  onChange={(e) =>
                    handleUpdateTeamMember(index, e.target.value)
                  }
                  placeholder="Team Member Name"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveTeamMember(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant={"outline"}
              onClick={handleAddTeamMember}
            >
              Add Team Member
            </Button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Save Project
          </Button>
        </div>
      </form>
    </div>
  );
  return <>{content}</>;
}
