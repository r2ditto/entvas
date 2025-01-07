import NextLink from "next/link";
import { Box, Grid, GridItem, Heading, Link, VStack } from "@chakra-ui/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid templateRows="auto 1fr" templateColumns="200px 1fr" minH="100vh">
      <GridItem as="header" colSpan={2} p={4}>
        <Heading size="3xl">Entvas</Heading>
      </GridItem>

      <GridItem as="aside" p={4}>
        <Box as="nav" borderRadius="xl" boxShadow="sm" p={4}>
          <VStack alignItems="flex-start">
            <Link as={NextLink} href="/">
              Dashboard
            </Link>
            <Link as={NextLink} href="/quote">
              Quote
            </Link>
          </VStack>
        </Box>
      </GridItem>

      <GridItem as="main" p={4}>
        <Box as="main" borderRadius="xl" boxShadow="sm" p={4}>
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
}
