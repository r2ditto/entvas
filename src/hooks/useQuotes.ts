import useSWR from "swr";
import { supabase } from "@/pages/_app";
import { Quote } from "@/types";

const fetcher = async () => {
  const { data, error } = await supabase.from("quotes").select("*");

  if (error) throw error;

  return data;
};

export function useQuotes(fallbackData?: Quote[], refreshInterval?: number) {
  const { data, error, mutate, isLoading } = useSWR("quotes", fetcher, {
    fallbackData,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateOnMount: !fallbackData,
    refreshInterval,
  });

  return {
    quotes: data,
    isLoading,
    isError: error,
    mutate,
  };
}
