import React from "react";
import {
  Input,
  VStack,
  HStack,
  NumberInputLabel,
  NumberInputRoot,
} from "@chakra-ui/react";

import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { NumberInputField } from "@/components/ui/number-input";
import { QuoteFormData } from "@/types";

type QuoteFormProps = {
  quote: QuoteFormData;
  setQuote: (quote: QuoteFormData) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function QuoteForm({
  quote,
  setQuote,
  isLoading,
  onSubmit,
}: QuoteFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <VStack gap={8} align="flex-start">
        <Field label="Type of Service">
          <Input
            placeholder="Type of service"
            value={quote.typeOfService}
            onChange={(e) =>
              setQuote({ ...quote, typeOfService: e.target.value })
            }
            required
          />
        </Field>
        <Field label="Quote Amount">
          <NumberInputRoot
            value={quote.quoteAmount}
            onChange={(e: React.FormEvent<HTMLDivElement>) =>
              setQuote({
                ...quote,
                quoteAmount: (e.target as HTMLInputElement).value,
              })
            }
            width="100%"
          >
            <NumberInputLabel />
            <NumberInputField required />
          </NumberInputRoot>
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="me@example.com"
            value={quote.email}
            onChange={(e) => setQuote({ ...quote, email: e.target.value })}
            required
          />
        </Field>
        <HStack gap="4" align="center">
          <Button
            colorPalette="green"
            variant="outline"
            loading={isLoading}
            loadingText="Submitting..."
            type="submit"
          >
            Submit
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
