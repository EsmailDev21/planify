import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { format } from "date-fns";
import { updateQuote } from "@/lib/redux/slices/quoteSlice";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import QuotePDFDownload from "./QuotePdfDocument";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const dispatch = useDispatch();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const [updatedQuote, setUpdatedQuote] = React.useState({
    client: quote.client,
    amount: quote.amount,
    dueDate: quote.dueDate,
    address: quote.address,
    items: quote.items,
  });

  const handleUpdateField = (field: string, value: any) => {
    setUpdatedQuote((prevQuote) => ({ ...prevQuote, [field]: value }));
  };

  const handleUpdateItem = (index: number, field: string, value: any) => {
    setUpdatedQuote((prevQuote) => ({
      ...prevQuote,
      items: prevQuote.items.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSaveUpdates = () => {
    dispatch(updateQuote({ ...quote, ...updatedQuote }));
    setIsUpdating(false);
  };

  return (
    <ScrollArea className="p-6 space-y-6">
      {/* Grid Layout for better design */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quote Header Section */}
        <Card className="border border-muted shadow-sm rounded-lg p-4">
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

        {/* Client Info Section */}
        <Card className="border border-muted shadow-sm rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold ">Client</div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={quote.client.profilePhoto}
                  alt={quote.client.fullName}
                />
                <AvatarFallback>{quote.client.fullName?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                {isUpdating ? (
                  <Input
                    value={updatedQuote.client.fullName}
                    onChange={(e) =>
                      handleUpdateField("client", {
                        ...updatedQuote.client,
                        fullName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="text-lg font-semibold">
                    {quote.client.fullName}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <div className="text-sm text-slate-500">Montant</div>
            <div className="text-lg font-bold text-blue-600">
              {isUpdating ? (
                <Input
                  type="number"
                  value={updatedQuote.amount}
                  onChange={(e) =>
                    handleUpdateField("amount", Number(e.target.value))
                  }
                />
              ) : (
                `${quote.amount.toFixed(2)} €`
              )}
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <div className="text-sm text-slate-500">Date de création</div>
            <div className="text-sm">
              {format(new Date(quote.createdAt), "yyyy-MM-dd")}
            </div>
          </div>

          {quote.dueDate && (
            <>
              <Separator />
              <div className="flex justify-between">
                <div className="text-sm text-slate-500">
                  Date d&apos;échéance
                </div>
                <div className="text-sm">
                  {isUpdating ? (
                    <DatePicker
                      date={format(
                        new Date(updatedQuote.dueDate),
                        "yyyy-MM-dd"
                      )}
                      setDate={(date: Date) =>
                        handleUpdateField("dueDate", date)
                      }
                    />
                  ) : (
                    format(new Date(quote.dueDate), "yyyy-MM-dd")
                  )}
                </div>
              </div>
            </>
          )}

          {quote.address && (
            <>
              <Separator />
              <div className="flex justify-between">
                <div className="text-sm text-slate-500">Adresse</div>
                <div className="text-sm">
                  {isUpdating ? (
                    <Input
                      value={updatedQuote.address}
                      onChange={(e) =>
                        handleUpdateField("address", e.target.value)
                      }
                    />
                  ) : (
                    quote.address
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Thumbnail Section (reduced size and better layout) */}

      {/* Quote Items Section (Using Shadcn Table) */}
      <Card className="border border-muted shadow-sm mt-2 rounded-lg p-4">
        <CardHeader>
          <CardTitle>Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Liste des articles de la dévis.</TableCaption>
            <TableHeader>
              <TableRow className="border-muted">
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Prix Unitaire</TableHead>
                <TableHead className="text-right">Quantité</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Taxe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {updatedQuote.items.map((item, index) => (
                <TableRow className="border-muted" key={item.id}>
                  <TableCell className="font-medium">
                    {item.task
                      ? item.task.title
                      : item.equipment
                      ? item.equipment.label
                      : item.product?.label || `Item ${index + 1}`}
                  </TableCell>
                  <TableCell>
                    {item.task
                      ? "Tâche à faire"
                      : item.equipment
                      ? "Équipement à utiliser"
                      : "Produit à utiliser"}
                  </TableCell>
                  <TableCell className="text-right">
                    {isUpdating ? (
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleUpdateItem(
                            index,
                            "unitPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    ) : (
                      `${item.unitPrice.toFixed(2)} €`
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isUpdating ? (
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateItem(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    ) : (
                      item.quantity
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {(item.unitPrice * item.quantity).toFixed(2)} €
                  </TableCell>
                  <TableCell className="text-right">{item.tva}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        {isUpdating ? (
          <Button onClick={handleSaveUpdates}>Sauvegarder</Button>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setIsUpdating(true)}
              className="flex items-center"
            >
              <PiPencilSimpleLight className="mr-2" />
              Modifier
            </Button>
            <Button variant="outline" className="flex items-center">
              <PiDownloadLight className="mr-2" />

              <QuotePDFDownload quote={quote} />
            </Button>
            {isUpdating && (
              <Button onClick={onUpdateClick} className="flex items-center">
                <PiCalendarPlusLight className="mr-2" />
                Mettre à jour
              </Button>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  );
};

export default QuoteDetails;
