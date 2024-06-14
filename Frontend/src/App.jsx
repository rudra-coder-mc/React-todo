import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetTodo } from "./Store/Server/query";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoStatusMutation,
  useUpdateTodoMutation,
} from "./Store/Server/mutation";
import Input from "./Components/Input";
import Options from "./Components/Option";

function App() {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [updateID, setUpdateID] = useState("");
  const queryClient = useQueryClient();
  const addTodo = useAddTodoMutation();
  const deleteTodo = useDeleteTodoMutation();
  const toggleTodoStatus = useToggleTodoStatusMutation();
  const UpdateTodo = useUpdateTodoMutation();

  const handleAddOrUpdateTodo = (e) => {
    e.preventDefault();

    if (updateID) {
      UpdateTodo.mutate(
        { todo, updateID },
        {
          onSuccess: () => {
            queryClient.invalidateQueries("todos");
            setTodo({ title: "", description: "" });
            setUpdateID("");
          },
        }
      );
    } else {
      addTodo.mutate(todo, {
        onSuccess: () => {
          queryClient.invalidateQueries("todos");
          setTodo({ title: "", description: "" });
        },
      });
    }
  };

  const [state, setState] = useState(null);

  const { isLoading, error, data } = useGetTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  // console.log(data.length);
  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-dvh bg-black text-white">
        <div className="artboard artboard-horizontal phone-3 flex flex-col justify-center items-center m-5 bg-gray-800 border">
          <form
            className="flex flex-col gap-8 p-4 w-full   "
            onSubmit={handleAddOrUpdateTodo}
          >
            <Input
              placeholder="TODO title"
              required
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />

            <textarea
              type="text"
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
        <div className="w-full flex justify-around max-w-[600px] gap-4 my-6">
          <Options
            title="all"
            count={data.length}
            onClick={() => setState(null)}
          />
          <Options
            title="Pading"
            onClick={() => {
              setState(false);
            }}
          />
          <Options title="Complite" onClick={() => setState(true)} />
        </div>

        <div className="flex justify-center overflow-auto ">
          <table className="table w-1/2 bg-gray-800">
            <tbody>
              {state != null &&
                data
                  .filter((todo) => todo.isComplete == state)
                  .map((todo) => (
                    <tr key={todo._id}>
                      <td>
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            checked={todo.isComplete}
                            onChange={() =>
                              toggleTodoStatus.mutate(todo._id, {
                                onSuccess: () => {
                                  queryClient.invalidateQueries("todos");
                                },
                              })
                            }
                            disabled={toggleTodoStatus.isPending}
                          />
                        </label>
                      </td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>
                        <button
                          className="btn bg-red-600 text-white"
                          onClick={() =>
                            deleteTodo.mutate(todo._id, {
                              onSuccess: () => {
                                queryClient.invalidateQueries("todos");
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
              {state == null &&
                data.map((todo) => (
                  <tr key={todo._id}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={todo.isComplete}
                          onChange={() =>
                            toggleTodoStatus.mutate(todo._id, {
                              onSuccess: () => {
                                queryClient.invalidateQueries("todos");
                              },
                            })
                          }
                          disabled={toggleTodoStatus.isPending}
                        />
                      </label>
                    </td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>
                      <button
                        className="btn bg-red-600 text-white"
                        onClick={() =>
                          deleteTodo.mutate(todo._id, {
                            onSuccess: () => {
                              queryClient.invalidateQueries("todos");
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
      </div>
    </>
  );
}

export default App;
