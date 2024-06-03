import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const featchAll = () =>
  axios.get("http://localhost:8080/api/v1/todos").then((res) => res.data);
const featchPadingTodo = () =>
  axios
    .get("http://localhost:8080/api/v1/todos?complete=true")
    .then((res) => res.data);
const featchCompliteTodo = () =>
  axios
    .get("http://localhost:8080/api/v1/todos?complete=false")
    .then((res) => res.data);

export const useGetTodo = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => featchAll(),
  });
export const usePandingTodo = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => featchPadingTodo,
  });
export const useCompliteTodo = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: () => featchCompliteTodo,
  });
