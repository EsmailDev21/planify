import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QuoteModel, QuoteStatus } from "@/lib/types/models";

const statusColorMap: Record<QuoteStatus, string> = {
  [QuoteStatus.PENDING]: "bg-yellow-200 text-yellow-800",
  [QuoteStatus.ACCEPTED]: "bg-green-200 text-green-800",
  [QuoteStatus.REJECTED]: "bg-red-200 text-red-800",
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(date);

type QuoteCardProps = {
  quote: QuoteModel;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
};

const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <Card
      data-id={quote.id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className="shadow-sm rounded-lg border border-slate-200 dark:border-slate-700 cursor-grab"
    >
      <CardHeader className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-7 rounded-full w-7">
            <AvatarImage
              src={quote.sender.profilePhoto}
              alt={quote.sender.fullName}
              className="w-10 h-10 rounded-full"
            />
            <AvatarFallback>{quote.sender.fullName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg font-semibold">
              {quote.sender.fullName}
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              {quote.sender.email}
            </CardDescription>
          </div>
        </div>
        <Badge className={`px-2 py-1 rounded ${statusColorMap[quote.status]}`}>
          {QuoteStatus[quote.status]}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 rounded-full w-7">
            <AvatarImage
              src={quote.client.profilePhoto}
              alt={quote.client.fullName}
              className="w-8 h-8 rounded-full"
            />
            <AvatarFallback>{quote.client.fullName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{quote.client.fullName}</span>
            <span className="text-xs text-slate-500">
              {quote.client.phoneNumber}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600">{quote.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Montant :</span>
          <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
            {quote.amount.toFixed(2)} €
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Créé le :</span>
          <span className="text-sm text-slate-500">
            {formatDate(quote.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;
