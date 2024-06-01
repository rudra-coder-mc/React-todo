import  { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const [todo, setTodo] = useState({ title: "", description: "" });
  const [updateID, setUpdateID] = useState(null);
  const queryClient = useQueryClient();

  const addTodo = async (newTodo) => {
    await axios.post("http://localhost:8080/api/v1/todos/", newTodo);
  };

  const updateTodo = async (updatedTodo) => {
    await axios.patch(
      `http://localhost:8080/api/v1/todos/${updateID}`,
      updatedTodo
    );
    setUpdateID(null);
    setTodo({ title: "", description: "" });
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);
  };

  const toggleTodoStatus = async (id) => {
    await axios.patch(`http://localhost:8080/api/v1/todos/toggle/status/${id}`);
  };

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const toggleTodoStatusMutation = useMutation({
    mutationFn: toggleTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleAddOrUpdateTodo = (e) => {
    e.preventDefault();
    if (updateID) {
      updateTodoMutation.mutate(todo);
    } else {
      addTodoMutation.mutate(todo);
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get("http://localhost:8080/api/v1/todos")
        .then((res) => res.data.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-dvh">
        <div className="artboard artboard-horizontal phone-1 flex flex-col justify-center items-center m-5 bg-slate-100">
          <form
            className="flex flex-col gap-4 p-4 w-full"
            onSubmit={handleAddOrUpdateTodo}
          >
            <input
              className="input input-bordered w-full"
              placeholder="TODO title"
              required
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="TODO description"
              className="input input-bordered w-full"
              required
              value={todo.description}
              onChange={(e) =>
                setTodo({ ...todo, description: e.target.value })
              }
            />
            <input
              type="submit"
              className="btn btn-primary"
              value={updateID ? "Update" : "Submit"}
            />
          </form>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo) => (
                <tr key={todo._id}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={todo.isComplete}
                        onChange={() =>
                          toggleTodoStatusMutation.mutate(todo._id)
                        }
                        disabled={toggleTodoStatusMutation.isPending}
                      />
                    </label>
                  </td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
                    <button
                      className="btn bg-red-600 text-white"
                      onClick={() => deleteTodoMutation.mutate(todo._id)}
                      disabled={deleteTodoMutation.isPending}
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
