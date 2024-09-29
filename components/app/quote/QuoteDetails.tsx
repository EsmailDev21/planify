import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PiCurrencyDollarLight,
  PiCalendarPlusLight,
  PiDownloadLight,
  PiPencilSimpleLight,
} from "react-icons/pi";
import { QuoteModel, QuoteStatus } from "@/lib/types/models";
import { formatDate } from "date-fns";
import QuotePDFDownload from "./QuotePdfDocument";
// Assume this utility formats the date properly

type QuoteDetailsProps = {
  quote: QuoteModel;
  onUpdateClick: () => void;
  onDownloadClick: () => void;
};

const statusColorMap: Record<QuoteStatus, string> = {
  [QuoteStatus.PENDING]: "bg-yellow-200 text-yellow-800",
  [QuoteStatus.ACCEPTED]: "bg-green-200 text-green-800",
  [QuoteStatus.REJECTED]: "bg-red-200 text-red-800",
};

const QuoteDetails: React.FC<QuoteDetailsProps> = ({
  quote,
  onUpdateClick,
  onDownloadClick,
}) => {
  return (
    <ScrollArea className="p-6 space-y-6">
      {/* Quote Header Section */}
      <Card className="border shadow-sm rounded-lg p-4">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={quote.sender.profilePhoto}
                alt={quote.sender.fullName}
              />
              <AvatarFallback>{quote.sender.fullName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{quote.sender.fullName}</CardTitle>
              <CardDescription className="text-sm text-slate-500">
                {quote.sender.email}
              </CardDescription>
            </div>
          </div>
          <Badge className={`px-2 py-1 ${statusColorMap[quote.status]}`}>
            {quote.status === QuoteStatus.PENDING
              ? "En Attente"
              : quote.status === QuoteStatus.ACCEPTED
              ? "Accepté"
              : "Rejeté"}
          </Badge>
        </CardHeader>
      </Card>

      {/* Quote Info Section */}
      <Card className="border shadow-sm rounded-lg p-4 space-y-4">
        <div className="flex justify-between">
          <div className="text-sm text-slate-500">Client</div>
          <div className="flex items-center space-x-2">
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={quote.client.profilePhoto}
                alt={quote.client.fullName}
              />
              <AvatarFallback>{quote.client.fullName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">{quote.client.fullName}</div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between">
          <div className="text-sm text-slate-500">Montant</div>
          <div className="text-lg font-semibold text-blue-600">
            {quote.amount.toFixed(2)} €
          </div>
        </div>

        <Separator />

        <div className="flex justify-between">
          <div className="text-sm text-slate-500">Date de création</div>
          <div className="text-sm">
            {formatDate(quote.createdAt, "yyyy-MM-dd")}
          </div>
        </div>

        {quote.dueDate && (
          <>
            <Separator />
            <div className="flex justify-between">
              <div className="text-sm text-slate-500">Date d'échéance</div>
              <div className="text-sm">
                {formatDate(quote.dueDate, "yyyy-MM-dd")}
              </div>
            </div>
          </>
        )}

        {quote.address && (
          <>
            <Separator />
            <div className="flex justify-between">
              <div className="text-sm text-slate-500">Adresse</div>
              <div className="text-sm">{quote.address}</div>
            </div>
          </>
        )}
      </Card>

      {/* Quote Items Section */}
      <Card className="border shadow-sm rounded-lg p-4">
        <CardHeader>
          <CardTitle>Articles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quote.items.map((item, index) => (
            <div key={item.id} className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <div className="text-sm text-slate-500">
                  {/* Display description or default to "Item {index}" */}
                  {item.description || `Item ${index + 1}`}
                </div>
                <div className="text-sm font-semibold">
                  {item.totalPrice.toFixed(2)} €
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm text-slate-600">
                <div>
                  <span className="font-semibold">Type: </span>
                  {item.task
                    ? "Tâche à faire"
                    : item.equipment
                    ? "Équipement à utiliser"
                    : "Produit à utiliser"}
                </div>
                <div>
                  <span className="font-semibold">Unit Price: </span>
                  {item.unitPrice.toFixed(2)} €
                </div>
                <div>
                  <span className="font-semibold">Quantity: </span>
                  {item.quantity}
                </div>
                <div>
                  <span className="font-semibold">TVA: </span>
                  {item.tva.toFixed(2)} %
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button onClick={onUpdateClick} variant="secondary">
          <PiPencilSimpleLight size={18} className="mr-2" />
          Modifier
        </Button>
        <Button variant="default">
          <PiDownloadLight size={18} className="mr-2" />
          <QuotePDFDownload quote={quote} />
        </Button>
      </div>
    </ScrollArea>
  );
};

export default QuoteDetails;
