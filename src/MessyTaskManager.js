import React, { useState, useEffect } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    id: 0,
    description: "",
    priority: 0, // Default to Low priority (0)
    isRequired: false,
    isCompleted: false,
    createdDate: new Date().toISOString().split("T")[0], // Current date
    dueDate: "",
    completedDate: null,
  });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({});
  const [activeTab, setActiveTab] = useState("active"); // Track active tab

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        fetchTasks();
        setNewTask({
          id: 0,
          description: "",
          priority: 0,
          isRequired: false,
          isCompleted: false,
          createdDate: new Date().toISOString().split("T")[0],
          dueDate: "",
          completedDate: null,
        });
      }
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  // Update an existing task
  const updateTask = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/${editTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTask),
      });
      if (response.ok) {
        fetchTasks();
        setEditTaskId(null);
        setEditTask({});
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Toggle task completion
  const toggleCompletion = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/ToggleComplete/${id}`, {
        method: "PUT",
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle completion:", error);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on completion status
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "active" ? "active-tab" : ""}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={activeTab === "completed" ? "active-tab" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

      {/* Add New Task */}
      {activeTab === "active" && (
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
            onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value) })}
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          {/* <label>
            <input
              type="checkbox"
              checked={newTask.isRequired}
              onChange={(e) => setNewTask({ ...newTask, isRequired: e.target.checked })}
            />
            Is Required
          </label> */}
          <button onClick={createTask}>Add Task</button>
        </div>
      )}

      {/* Task List */}
      {activeTab === "active" && (
        <div>
          <h2>Active Tasks</h2>
          <ul>
            {activeTasks.map((task) => (
              <li key={task.id}>
                <span>
                  {task.description} - {task.priority === 0 ? "Low" : task.priority === 1 ? "Medium" : "High"} - Due: {task.dueDate}
                </span>
                <button onClick={() => toggleCompletion(task.id)}>Mark Complete</button>
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
      )}

      {activeTab === "completed" && (
        <div>
          <h2>Completed Tasks</h2>
          <ul>
            {completedTasks.map((task) => (
              <li key={task.id}>
                <span>
                  {task.description} - {task.priority === 0 ? "Low" : task.priority === 1 ? "Medium" : "High"} - Due: {task.dueDate}
                </span>
                <button onClick={() => toggleCompletion(task.id)}>Mark Incomplete</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
            onChange={(e) => setEditTask({ ...editTask, priority: parseInt(e.target.value) })}
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
          <input
            type="date"
            value={editTask.dueDate}
            onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
          />
          {/* <label>
            <input
              type="checkbox"
              checked={editTask.isRequired}
              onChange={(e) => setEditTask({ ...editTask, isRequired: e.target.checked })}
            />
            Is Required
          </label> */}
          <button onClick={updateTask}>Update Task</button>
          <button
            onClick={() => {
              setEditTaskId(null);
              setEditTask({});
            }}
          >
            Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
