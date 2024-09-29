import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import React from "react";
import { QuoteModel } from "@/lib/types/models"; // Ensure QuoteModel is correctly imported

// Define styles for the PDF document
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9", // Light background color
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4a90e2", // Blue header
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: "#333", // Darker title color
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff", // White background for sections
    borderRadius: 5,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Subtle shadow for sections
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    textAlign: "right",
    color: "#333",
  },
  itemsHeader: {
    fontWeight: "bold",
    backgroundColor: "#e1f5fe", // Light blue background for items header
    padding: 5,
    borderBottom: "2px solid #4a90e2", // Blue border
    display: "flex",
    flexDirection: "row",
  },
  itemRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #eaeaea",
    paddingVertical: 5,
  },
  itemColumn: {
    width: "15%",
    textAlign: "right",
    color: "#4a90e2", // Blue color for item columns
  },
  itemDescription: {
    width: "40%",
    textAlign: "left",
    color: "#333",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#999",
  },
});

// Create the PDF document with all quote details
const MyDocument = ({ quote }: { quote: QuoteModel }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Quote Header */}
      <Text style={styles.header}>Dévis: {quote.title}</Text>

      {/* Sender and Client Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Devis émis par:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.value}>{quote.sender.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{quote.sender.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Client:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.value}>{quote.client.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Téléphone:</Text>
          <Text style={styles.value}>{quote.client.phoneNumber}</Text>
        </View>
        {quote.address && (
          <View style={styles.row}>
            <Text style={styles.label}>Adresse:</Text>
            <Text style={styles.value}>{quote.address}</Text>
          </View>
        )}
      </View>

      {/* Quote Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Détails du devis:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Montant total:</Text>
          <Text style={styles.value}>{quote.amount.toFixed(2)} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date de création:</Text>
          <Text style={styles.value}>
            {new Date(quote.createdAt).toLocaleDateString()}
          </Text>
        </View>
        {quote.dueDate && (
          <View style={styles.row}>
            <Text style={styles.label}>Date d&apos;échéance:</Text>
            <Text style={styles.value}>
              {new Date(quote.dueDate).toLocaleDateString()}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Statut:</Text>
          <Text style={styles.value}>{quote.status}</Text>
        </View>
      </View>

      {/* Quote Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Articles:</Text>
        <View style={styles.itemsHeader}>
          <Text style={styles.itemDescription}>Description</Text>
          <Text style={styles.itemColumn}>Quantité</Text>
          <Text style={styles.itemColumn}>Prix Unitaire (€)</Text>
          <Text style={styles.itemColumn}>TVA (%)</Text>
          <Text style={styles.itemColumn}>Prix Total (€)</Text>
        </View>

        {quote.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemDescription}>
              {item.task
                ? "Tâche: " + item.task.title
                : item.equipment
                ? "Équipement: " + item.equipment.label
                : "Produit: " + item.product?.label}
            </Text>
            <Text style={styles.itemColumn}>{item.quantity}</Text>
            <Text style={styles.itemColumn}>{item.unitPrice.toFixed(2)}</Text>
            <Text style={styles.itemColumn}>{item.tva.toFixed(2)}</Text>
            <Text style={styles.itemColumn}>{item.totalPrice.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text>Ce devis a été généré automatiquement.</Text>
        <Text>Merci pour votre confiance.</Text>
      </View>
    </Page>
  </Document>
);

// Rendering the PDF download link in the main component
const QuotePDFDownload = ({ quote }: { quote: QuoteModel }) => (
  <PDFDownloadLink document={<MyDocument quote={quote} />} fileName="quote.pdf">
    {"Télécharger PDF"}
  </PDFDownloadLink>
);

export default QuotePDFDownload;
