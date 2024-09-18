import { useState, FormEvent, ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTodo } from "./Store/Server/query";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoStatusMutation,
  useUpdateTodoMutation,
} from "./Store/Server/mutation";
import Input from "./Components/Input";
import { DataTable } from "./Components/DataTable";
// import Options from "./Components/Option";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface stateTodo {
  title: string;
  description: string;
}

function App() {
  const [todo, setTodo] = useState<stateTodo>({
    title: "",
    description: "",
  });
  const [updateID, setUpdateID] = useState<string>("");
  const queryClient = useQueryClient();
  const addTodo = useAddTodoMutation();
  const deleteTodo = useDeleteTodoMutation();
  const toggleTodoStatus = useToggleTodoStatusMutation();
  const UpdateTodo = useUpdateTodoMutation();

  const handleAddOrUpdateTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updateID) {
      UpdateTodo.mutate(
        { todo, updateID },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setTodo({ title: "", description: "" });
            setUpdateID("");
          },
        },
      );
    } else {
      addTodo.mutate(todo, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["todos"] });
          setTodo({ title: "", description: "" });
        },
      });
    }
  };

  const { isLoading, error } = useGetTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error)
    return <div>An error has occurred: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-dvh bg-black text-white">
        <div className="artboard artboard-horizontal phone-3 flex flex-col justify-center items-center m-5 bg-gray-800 border">
          <form
            className="flex flex-col gap-8 p-4 w-full"
            onSubmit={handleAddOrUpdateTodo}
          >
            <Input
              placeholder="TODO title"
              required
              value={todo.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTodo({ ...todo, title: e.target.value })
              }
            />

            <textarea
              className="bg-transparent rounded-xl focus:border-purple-500 outline-none border-[1px] px-5 py-3 text-base md:text-lg border-white"
              placeholder="TODO description"
              required
              value={todo.description}
              rows={6}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            />

            <Input type="submit" value={updateID ? "Update" : "Submit"} />
          </form>
        </div>

        <DataTable
          setTodo={setTodo}
          deleteTodo={deleteTodo}
          queryClient={queryClient}
          toggleTodoStatus={toggleTodoStatus}
          setUpdateID={setUpdateID}
        />
      </div>
    </>
  );
}

export default App;
