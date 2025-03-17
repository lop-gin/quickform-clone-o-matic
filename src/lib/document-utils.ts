
/**
 * Generates a random invoice number with a specific format: INV-XXXXX
 * where XXXXX is a random 5-digit number
 */
export const generateInvoiceNumber = (): string => {
  const random = Math.floor(Math.random() * 90000) + 10000; // 5-digit random number
  return `INV-${random}`;
};

/**
 * Formats a currency value to a string with 2 decimal places
 */
export const formatCurrency = (value: number): string => {
  return value.toFixed(2);
};

/**
 * Calculates the due date based on terms
 */
export const calculateDueDate = (invoiceDate: Date, terms: string): Date => {
  const date = new Date(invoiceDate);
  
  if (terms === "Due on receipt") {
    return date;
  }
  
  const daysMatch = terms.match(/Net (\d+)/);
  if (daysMatch && daysMatch[1]) {
    const days = parseInt(daysMatch[1], 10);
    date.setDate(date.getDate() + days);
  }
  
  return date;
};

/**
 * Generates a random receipt number with a specific format: REC-XXXXX
 * where XXXXX is a random 5-digit number
 */
export const generateReceiptNumber = (): string => {
  const random = Math.floor(Math.random() * 90000) + 10000; // 5-digit random number
  return `REC-${random}`;
};
