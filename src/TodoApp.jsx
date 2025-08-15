import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!input.trim()) return;

    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: input,
      };
      setTodos([...todos, newTodo]);
    }

    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditId(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
          ToDo List📝 
        </h2>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-4">
          {todos.length === 0 && (
            <p className="text-center text-gray-400">No tasks yet.</p>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-4 py-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-800 mb-2 sm:mb-0 break-words w-full sm:w-auto text-center sm:text-left">
                {todo.text}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
