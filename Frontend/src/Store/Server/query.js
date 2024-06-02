import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const featch = () =>
  axios.get("http://localhost:8080/api/v1/todos").then((res) => res.data.data);

export const useGetTodo = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => featch(),
  });
