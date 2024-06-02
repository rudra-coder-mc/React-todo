import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const addTodo = async (newTodo) => {
  await axios.post("http://localhost:8080/api/v1/todos/", newTodo);
};

const updateTodo = async ({ todo, updateID }) => {
  return await axios.patch(
    `http://localhost:8080/api/v1/todos/${updateID}`,
    todo
  );
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
};

const toggleTodoStatus = async (id) => {
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
