import { useState, useEffect } from "react";
import "./index.css";
import Ripple from "./Ripple";

function App() {
  const [task, settask] = useState("");
  const [taskList, setTaskList] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    console.log("Loading tasks from localStorage");
    const storedTasks = localStorage.getItem("tasks");
    console.log("Loaded from localStorage:", storedTasks);
    if (storedTasks) {
      setTaskList(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    console.log("Saving to localStorage:", taskList);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const updatedTaskList = [...taskList, task];
      setTaskList(updatedTaskList);
      settask(""); // Clear the input field
      console.log("Adding task:", task);
      console.log("Updated task list:", updatedTaskList);
    }
  };

  const removeTask = (i) => {
    const newList = taskList.filter((_, index) => index !== i);
    setTaskList(newList);
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100svh] z-20 overflow-hidden relative">
        <Ripple className="absolute inset-0 z-10" />
        <div className="flex justify-center items-center gap-2 flex-col">
          <form
            onSubmit={handleSubmit}
            className="border border-stone-600 p-1 focus:outline-none z-20"
          >
            <input
              type="text"
              placeholder="Write your todo"
              value={task}
              className="focus:outline-none"
              onChange={(e) => {
                settask(e.target.value);
              }}
            ></input>
            <button type="submit">
              <span>+</span>
            </button>
          </form>
          <div className="overflow-auto h-full w-full">
            <ul>
              {taskList.map((taskItem, index) => (
                <li key={index} className="flex items-center justify-center">
                  <label className="text-stone-300">{taskItem}</label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    className="w-5 h-5 cursor-pointer stroke-stone-300"
                    onClick={() => removeTask(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
