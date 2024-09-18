import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { stateTodo } from "../../App";

const addTodo = async (newTodo: stateTodo) => {
  await axios.post("http://localhost:8080/api/v1/todos/", newTodo);
};

const updateTodo = async ({
  todo,
  updateID,
}: {
  todo: stateTodo;
  updateID: string;
}) => {
  return await axios.patch(
    `http://localhost:8080/api/v1/todos/${updateID}`,
    todo,
  );
};

const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
};

const toggleTodoStatus = async (id: string) => {
  await axios.patch(`http://localhost:8080/api/v1/todos/toggle/status/${id}`);
};

export const useAddTodoMutation = () => useMutation({ mutationFn: addTodo });

export const useUpdateTodoMutation = () =>
  useMutation({
    mutationFn: updateTodo,
  });

export const useDeleteTodoMutation = () =>
  useMutation({
    mutationFn: deleteTodo,
  });

export const useToggleTodoStatusMutation = () =>
  useMutation({
    mutationFn: toggleTodoStatus,
  });
