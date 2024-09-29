"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuote, selectQuotes } from "@/lib/redux/slices/quoteSlice";
import { DatePicker } from "@/components/ui/date-picker";
import {
  QuoteStatus,
  QuoteItemType,
  TaskModel,
  ProductModel,
  EquipmentModel,
  QuoteModel,
  UserRole,
  QuoteItemModel,
  Priority,
  Status,
} from "@/lib/types/models";
import { Form } from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  PiPenLight,
  PiPlusLight,
  PiStarLight,
  PiUserPlusLight,
} from "react-icons/pi";
import {
  generateRandomAvatar,
  generateRandomColor,
} from "../tasks/views/GanttTask.component";
import Image from "next/image";
import { addImage } from "@/lib/redux/slices/imageGallerySlice";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { randomInt } from "crypto";
import { transFormStatus } from "../projects/ProjectCard.component";
import { UpdateTaskDialog } from "../tasks/components/updateTask";
import { useState } from "react";
import { addTask, selectTasks, updateTask } from "@/lib/redux/slices/taskSlice";

export function AddQuoteDialog() {
  const [open, setOpen] = React.useState(false);
  // Basic Quote Fields
  const [title, setTitle] = React.useState("");
  const [client, setClient] = React.useState({
    fullName: "",
    phoneNumber: "",
    profilePhoto: "",
  });
  const [address, setAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [dueDate, setDueDate] = React.useState(new Date());
  const [status, setStatus] = React.useState(QuoteStatus.PENDING);
  const [description, setDescription] = React.useState("");
  const [thumbnail, setThumbnail] = React.useState("");
  // Items State
  const [items, setItems] = React.useState<QuoteItemModel[]>([]);
  const dispatch = useDispatch();
  const { quotes } = useSelector(selectQuotes);
  console.log({ items });
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
  const handleAddQuote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate the form fields before creating a newQuote
    if (!title || !client.fullName || !amount || items.length === 0) {
      alert("Please fill out all required fields and add at least one item.");
      return;
    }
    console.log("submit start");
    const newQuote: QuoteModel = {
      id: quotes.length.toString(),
      title,
      client,
      amount,
      dueDate,
      status,
      description,
      createdAt: new Date(),
      items,
      address,
      projectId: "",
      sender: {
        email: "john.doe@gmail.com",
        fullName: "John Doe",
        id: generateRandomColor() + generateRandomAvatar(),
        phoneNumber: "52 196 997",
        role: UserRole.AUTO_ENTERPRENEUR,
        profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
      },
      thumbnail,
    };
    console.log("submit");
    dispatch(addQuote(newQuote)); // Assuming you have an action to add the quote
    setOpen(false); // Close the form
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            " bg-primary text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          )}
        >
          <PiPlusLight className="mr-2" />
          Nouveau dévis
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-slate-50 h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Nouveau dévis</DialogTitle>
          <DialogDescription>
            Ajouter un Nouveau dévis dans votre liste de dévis.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-2"
          onSubmit={(e) => {
            handleAddQuote(e);
          }}
        >
          {/* Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
          />

          {/* Client Information */}
          <Input
            value={client.fullName}
            onChange={(e) => setClient({ ...client, fullName: e.target.value })}
            placeholder="Nom de client"
          />
          <Input
            value={client.phoneNumber}
            onChange={(e) =>
              setClient({ ...client, phoneNumber: e.target.value })
            }
            placeholder="Téléphone"
          />

          {/* Amount and Due Date */}
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            placeholder="Totale"
          />
          <DatePicker
            date={format(dueDate, "yyyy-MM-dd")}
            setDate={setDueDate}
          />
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Addresse"
          />

          {/* Status */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {status === QuoteStatus.PENDING
                  ? "En Attente"
                  : status === QuoteStatus.ACCEPTED
                  ? "Accèpté"
                  : "Réjèté"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setStatus(QuoteStatus.PENDING)}>
                En Cours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus(QuoteStatus.ACCEPTED)}>
                Accepté
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatus(QuoteStatus.REJECTED)}>
                Rejété
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Description */}
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quote Description"
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Télécharger une vignette pour la projet associé (optionnel)
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
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
          {/* Items Section */}

          <h3>Items</h3>
          <AddQuoteItem items={items} setItems={setItems} />
          {items.map((item, index) => (
            <RenderItem item={item} key={index} />
          ))}
          <Button type="submit">Enregistrer</Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const AddQuoteItem = ({
  items,
  setItems,
}: {
  items: QuoteItemModel[];
  setItems: React.Dispatch<React.SetStateAction<QuoteItemModel[]>>;
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState(QuoteItemType.TASK);
  const handleSubmit = () => {
    if (title.length > 0) {
      switch (type) {
        case QuoteItemType.TASK:
          dispatch(
            addTask({
              title: title,
              color: generateRandomColor(),
              endDate: addDays(new Date(), 7),
              id: Math.round(Math.random() * 99999).toString(),
              priority: Priority.LOW,
              progress: 0,
              startDate: new Date(),
              status: Status.TODO,
              tags: [],
              teamMembers: [
                {
                  fullName: "John Doe",
                  profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
                },
              ],
              description: "",
            })
          );
          setItems([
            {
              id: items.length.toString(),
              quantity: 1,
              totalPrice: 0,
              tva: 0,
              type,
              task: {
                title: title,
                color: generateRandomColor(),
                endDate: addDays(new Date(), 7),
                id: Math.round(Math.random() * 99999).toString(),
                priority: Priority.LOW,
                progress: 0,
                startDate: new Date(),
                status: Status.TODO,
                tags: [],
                teamMembers: [
                  {
                    fullName: "John Doe",
                    profilePhoto: `/assets/images/avatars/${generateRandomAvatar()}.png`,
                  },
                ],
                description: "",
              },
              unitPrice: 0,
              description: "",
            },
            ...items,
          ]);
          break;
        case QuoteItemType.EQUIPMENT:
          setItems([
            {
              id: items.length.toString(),
              quantity: 1,
              totalPrice: 0,
              tva: 0,
              type,
              equipment: {
                id: Math.round(Math.random() * 99999).toString(),
                label: title,
              },
              unitPrice: 0,
              description: "",
            },
            ...items,
          ]);
          break;
        case QuoteItemType.PRODUCT:
          setItems([
            {
              id: items.length.toString(),
              quantity: 1,
              totalPrice: 0,
              tva: 0,
              type,
              product: {
                id: Math.round(Math.random() * 99999).toString(),
                label: title,
              },
              unitPrice: 0,
              description: "",
            },
            ...items,
          ]);
          break;
      }
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
        Type d'item (par défaut tàche)
      </label>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Badge
          onClick={() => setType(QuoteItemType.TASK)}
          variant={"outline"}
          className={
            type === QuoteItemType.TASK
              ? "text-slate-900 text-sm bg-slate-100 hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
              : "text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
          }
        >
          Tàche
        </Badge>
        <Badge
          onClick={() => setType(QuoteItemType.EQUIPMENT)}
          variant={"outline"}
          className={
            type === QuoteItemType.EQUIPMENT
              ? "text-slate-900 text-sm bg-slate-100 hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
              : "text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
          }
        >
          Equippement
        </Badge>
        <Badge
          onClick={() => setType(QuoteItemType.PRODUCT)}
          variant={"outline"}
          className={
            type === QuoteItemType.PRODUCT
              ? "text-slate-900 text-sm bg-slate-100 hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
              : "text-slate-900 text-sm hover:bg-slate-100 flex flex-row space-x-2 cursor-pointer"
          }
        >
          Produit
        </Badge>
      </div>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <Button onClick={handleSubmit} variant={"default"}>
          <PiPlusLight />
        </Button>
      </div>
    </div>
  );
};

const RenderItem = ({ item }: { item: QuoteItemModel }) => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (item.task === undefined) return;
    else dispatch(updateTask(item.task));
  };
  return (
    <div
      key={item.id}
      className="flex w-full  flex-row  justify-between items-center space-x-2"
    >
      <p className="text-sm text-slate-800 font-normal">
        {item.task
          ? item.task.title
          : item.equipment
          ? item.equipment.label
          : item.product?.label}
      </p>

      <UpdateTaskDialog
        itemUpdater={true}
        parentItemToUpdate={item}
        isOpen={isOpen}
        onClose={function (): void {
          setOpen(false);
        }}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        task={
          item.task === undefined
            ? {
                id: "",
                title: "",
                description: undefined,
                tags: [],
                priority: Priority.HIGH,
                status: Status.TODO,
                startDate: new Date(),
                endDate: new Date(),
                progress: 0,
                color: "",
                teamMembers: [],
              }
            : item.task
        }
      ></UpdateTaskDialog>
    </div>
  );
};
