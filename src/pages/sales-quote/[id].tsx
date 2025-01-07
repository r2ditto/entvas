import React from "react";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";

import { supabase } from "../_app";
import { Quote, useQuotes } from "@/hooks/useQuotes";

export default function SalesQuotePage({ quote }: { quote: Quote }) {
  const { mutate } = useQuotes();

  const updateQuoteStatus = async (status: string) => {
    try {
      const { error } = await supabase
        .from("quotes")
        .update({ status })
        .eq("id", quote.id);

      if (error) throw error;

      await mutate();
      alert(`Quote has been ${status}`);
    } catch (error) {
      console.error("Error updating quote status:", error);
      alert("Something went wrong! Try again later.");
    }
  };

  if (!quote) return <Text>Quote not found</Text>;

  return (
    <Container
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      centerContent
      height="100vh"
    >
      <Box boxShadow="md" borderRadius="md" mt="10" p="8">
        <Box mb="8">
          <Heading fontSize="3xl">👋 {quote.recipient_email}!</Heading>
          <Text>Please accept or deny this service quote</Text>
        </Box>

        <Text>Type of Service: {quote.quote_details.type_of_service}</Text>
        <Text>Quote Amount: {quote.quote_details.quote_amount}</Text>
        <Text>Recipient Email: {quote.recipient_email}</Text>

        <HStack gap="4" mt="8">
          <Button
            variant="outline"
            colorPalette="green"
            onClick={() => updateQuoteStatus("accepted")}
          >
            Accept
          </Button>
          <Button
            colorPalette="red"
            onClick={() => updateQuoteStatus("denied")}
          >
            Deny
          </Button>
        </HStack>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching quote:", error);
    return { props: { quote: null } };
  }

  return { props: { quote: data } };
}
