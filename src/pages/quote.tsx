import React, { ReactElement, useState } from "react";
import { Heading, Text, Box } from "@chakra-ui/react";

import { supabase } from "./_app";

import { useQuotes } from "@/hooks/useQuotes";

import DashboardLayout from "@/components/layouts/dashboard-layout";
import QuoteForm from "@/components/forms/quote-form";
import { EmailData, QuoteData, QuoteFormData } from "@/types";

const createQuoteInDB = async (quoteData: QuoteData) => {
  const { data, error } = await supabase
    .from("quotes")
    .insert(quoteData)
    .select();

  if (error) throw error;
  return data[0];
};

const sendQuoteEmail = async (emailData: EmailData) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error("Failed to send email");
  }
  return response;
};

export default function QuotePage() {
  const { mutate } = useQuotes();
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<QuoteFormData>({
    typeOfService: "",
    quoteAmount: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const quoteData: QuoteData = {
        salesperson_email: "iamryanebro@gmail.com",
        recipient_email: quote.email,
        quote_details: {
          type_of_service: quote.typeOfService,
          quote_amount: quote.quoteAmount,
        },
      };

      const newQuote = await createQuoteInDB(quoteData);

      await sendQuoteEmail({
        recipientEmail: quote.email,
        quoteId: newQuote.id,
      });

      await mutate();
      alert("Quote created and email sent successfully!");

      setQuote({
        typeOfService: "",
        quoteAmount: "",
        email: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to process quote. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box mb="8">
        <Heading fontSize="3xl">Quote</Heading>
        <Text>Send a quote to a client</Text>
      </Box>

      <Box>
        <QuoteForm
          quote={quote}
          setQuote={setQuote}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </Box>
    </>
  );
}

QuotePage.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
