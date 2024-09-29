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
  TaskModel,
  Priority,
  Status,
  QuoteItemModel,
  EquipmentModel,
} from "@/lib/types/models";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PiPenLight } from "react-icons/pi";

type UpdateEquipmentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  setOpen: (p: boolean) => void;
  onSubmit: (equipment: EquipmentModel) => void;
  equipment: EquipmentModel;
  itemUpdater?: boolean;
  parentItemToUpdate?: QuoteItemModel;
  // Pass the existing task for updating
};

export function UpdateEquipmentDialog({
  isOpen,
  setOpen,
  onClose,
  onSubmit,
  equipment,
  itemUpdater,
  parentItemToUpdate,
}: UpdateEquipmentDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // State for handling input fields
  const [label, setLabel] = React.useState(equipment.label);
  const [itemData, setItemData] = React.useState(parentItemToUpdate);

  const handleSubmit = () => {
    const updatedRecord: EquipmentModel = {
      ...equipment,
      label,
    };
    onSubmit(updatedRecord);
    onClose();
  };

  const content = (
    <div className="flex  flex-row space-x-2">
      <div className="space-y-2 w-1/2 overflow-y-auto">
        <div className="flex flex-col space-y-2 mb-2">
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="text-sm font-medium text-slate-900 dark:text-white"
            placeholder="Désignation du produit"
          />
        </div>
      </div>
      {itemUpdater === true && itemData != undefined && (
        <div className="space-y-2 w-1/2 flex flex-col ">
          <div>
            <label className="text-md font-medium text-slate-800 dark:text-slate-400">
              Doonées relatifs à l&apos;item
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
          <DialogTitle>Modifier l&apos;équipement</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de l&apos;équipement.
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
          <DrawerTitle>Modifier l&apos;équipement</DrawerTitle>
          <DrawerDescription>
            Mettez à jour les informations de l&apos;équipement.
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
