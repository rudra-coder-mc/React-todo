import { QueryClient } from "@tanstack/react-query";
import { useGetTodo } from "../Store/Server/query.js";
import { Todo } from "../App";
import React from "react";

interface DataTableProps {
  toggleTodoStatus: {
    mutate: (id: string, options: { onSuccess: () => void }) => void;
    isPending: boolean;
  };
  deleteTodo: {
    mutate: (id: string, options: { onSuccess: () => void }) => void;
    isPending: boolean;
  };
  queryClient: QueryClient;
  setTodo: (todo: { title: string; description: string }) => void;
  setUpdateID: (id: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  toggleTodoStatus,
  deleteTodo,
  queryClient,
  setTodo,
  setUpdateID,
}) => {
  const { data } = useGetTodo();

  if (!data) return null;

  return (
    <div className="flex justify-center overflow-auto">
      <table className="table w-1/2 bg-gray-800">
        <tbody>
          {data.map((todo: Todo) => (
            <tr key={todo._id}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox bg-white"
                    checked={todo.isComplete}
                    onChange={() =>
                      toggleTodoStatus.mutate(todo._id, {
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["todos"],
                          });
                        },
                      })
                    }
                    disabled={toggleTodoStatus.isPending}
                  />
                </label>
              </td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td className="flex gap-2">
                <button
                  className="btn bg-red-600 text-white"
                  onClick={() =>
                    deleteTodo.mutate(todo._id, {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: ["todos"],
                        });
                      },
                    })
                  }
                  disabled={deleteTodo.isPending}
                >
                  Delete
                </button>
                <button
                  className="btn bg-green-600 text-white"
                  onClick={() => {
                    setTodo({
                      title: todo.title,
                      description: todo.description,
                    });
                    setUpdateID(todo._id);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
