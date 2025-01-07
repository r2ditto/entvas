export type QuoteFormData = {
  typeOfService: string;
  quoteAmount: string;
  email: string;
};

export type Quote = {
  id: string;
  salesperson_email: string;
  recipient_email: string;
  quote_details: {
    type_of_service: string;
    quote_amount: number;
  };
  status: string;
  created_at: string;
};

export type QuoteData = {
  salesperson_email: string;
  recipient_email: string;
  quote_details: {
    type_of_service: string;
    quote_amount: string;
  };
};

export type EmailData = {
  recipientEmail: string;
  quoteId: string;
};
