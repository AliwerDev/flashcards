import useSWR from "swr";
import { endpoints, fetcher } from "../utils/axios";

export const useGetCardList = () => {
  const { data: cardList, error, isLoading, mutate } = useSWR(endpoints.card.list, fetcher);
};
