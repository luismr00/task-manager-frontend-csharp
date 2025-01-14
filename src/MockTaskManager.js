import React, { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Complete the React project",
      priority: "High",
      dueDate: "2025-01-15",
      isRequired: true,
      isCompleted: false,
    },
    {
      id: 2,
      description: "Write unit tests",
      priority: "Medium",
      dueDate: "2025-01-20",
      isRequired: false,
      isCompleted: false,
    },
    {
      id: 3,
      description: "Fix bugs in the backend",
      priority: "Low",
      dueDate: "2025-01-25",
      isRequired: false,
      isCompleted: true,
    },
  ]);
  const [newTask, setNewTask] = useState({
    description: "",
    priority: "Low",
    dueDate: "",
    isRequired: false,
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({});

  // Create a new task
  const createTask = () => {
    const newId = tasks.length ? Math.max(tasks.map((task) => task.id)) + 1 : 1;
    const taskToAdd = { ...newTask, id: newId, isCompleted: false };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ description: "", priority: "Low", dueDate: "", isRequired: false });
  };

  // Update an existing task
  const updateTask = () => {
    setTasks(tasks.map((task) => (task.id === editTaskId ? editTask : task)));
    setEditTaskId(null);
    setEditTask({});
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* Add New Task */}
      <div>
        <h2>Create New Task</h2>
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={newTask.isRequired}
            onChange={(e) => setNewTask({ ...newTask, isRequired: e.target.checked })}
          />
          Is Required
        </label>
        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task List */}
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>
                {task.description} - {task.priority} - Due: {task.dueDate}
              </span>
              <button onClick={() => toggleCompletion(task.id)}>
                {task.isCompleted ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => {
                  setEditTaskId(task.id);
                  setEditTask(task);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Task */}
      {editTaskId && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            value={editTask.description}
            onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
          />
          <select
            value={editTask.priority}
            onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="date"
            value={editTask.dueDate}
            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={editTask.isRequired}
              onChange={(e) => setEditTask({ ...editTask, isRequired: e.target.checked })}
            />
            Is Required
          </label>
          <button onClick={updateTask}>Update Task</button>
          <button
            onClick={() => {
              setEditTaskId(null);
              setEditTask({});
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
