import React, { ReactElement } from "react";

import { Box, Card, Text, Heading, Flex } from "@chakra-ui/react";

import { supabase } from "./_app";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useQuotes } from "@/hooks/useQuotes";
import { Quote } from "@/types";

export default function Dashboard({ fallbackData }: { fallbackData: Quote[] }) {
  const { quotes, isLoading, isError } = useQuotes(fallbackData, 1000);

  if (isError) return <div>Error loading quotes</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Box mb="8">
        <Heading fontSize="3xl">Dashboard</Heading>
        <Text>Quickly view sent service quotations</Text>
      </Box>

      <Flex wrap="wrap" justify="flex-start" gap="4" width="100%">
        {quotes?.map((quote) => (
          <Card.Root
            key={quote.id}
            flex="1 1 30%"
            maxW="30%"
            bgColor="gray.100"
            border="none"
          >
            <Card.Body>
              <Card.Title my="2" textTransform="uppercase">
                {quote.quote_details.type_of_service}
              </Card.Title>
              <Card.Body p="0">
                <Text>Amount: {`$${quote.quote_details.quote_amount}`}</Text>
                <Text>Client Email: {`${quote.recipient_email}`}</Text>
              </Card.Body>
              <Card.Footer mt="5" p="0">
                Status: {quote.status}
              </Card.Footer>
            </Card.Body>
          </Card.Root>
        ))}
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase.from("quotes").select("*");

  if (error) {
    console.error("Error fetching quotes:", error);
    return { props: { fallbackData: [] } };
  }

  return {
    props: {
      fallbackData: data,
    },
  };
}

Dashboard.getLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
