import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState({ title: "", description: "" });

  // Fetch data initially and on add
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/todos");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const DeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todos/${id}`);

      fetchData();
    } catch (error) {
      console.error("Error Deleteing todos:", error);
    }
  };

  const handelStatesChange = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1/todos/toggle/status/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error Chang states of todos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array for initial fetch

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: "post",
        url: "http://localhost:8080/api/v1/todos/",
        headers: { "Content-Type": "application/json" },
        data,
      };

      const response = await axios.request(config);
      // console.log(response);
      setData({ title: "", description: "" });
      fetchData(); // Re-fetch data after adding a todo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };
  console.log(todos);
  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-dvh">
        <div className="artboard artboard-horizontal phone-1 flex flex-col justify-center items-center m-5 bg-slate-100">
          <form className="flex flex-col gap-4 p-4 w-full" onSubmit={handleAdd}>
            <input
              className="input input-bordered w-full"
              placeholder="TODO title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="TODO discription"
              className="input input-bordered w-full"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>description</th>
                <th>button</th>
              </tr>
            </thead>
            <tbody>
              {todos.length > 0 &&
                todos.map((todo) => (
                  <tr key={todo._id}>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={todo.isComplete}
                          onChange={() => handelStatesChange(todo._id)}
                        />
                      </label>
                    </td>
                    <td>{todo.title}</td>
                    <td>{todo.description}</td>
                    <td>
                      <input
                        type="button"
                        value="Delete"
                        className="btn bg-red-600 text-white"
                        onClick={() => DeleteTodo(todo._id)}
                      />
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
