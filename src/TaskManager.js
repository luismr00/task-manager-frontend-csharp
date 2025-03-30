import React, { useState, useEffect } from "react";
import "./styles/taskmanager.css"; // Import your CSS file for styling
import AddTask from "./components/AddTask";
import ActiveTasks from "./components/ActiveTasks";
import CompletedTasks from "./components/CompletedTasks";
import EditTask from "./components/EditTask";
import Header from "./components/Header";

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
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  
  function getUserIdFromToken(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
  
      const payload = JSON.parse(jsonPayload);
  
      const userId =
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      
      return parseInt(userId);
    } catch (err) {
      console.error("Invalid token or could not extract user ID", err);
      return null;
    }
  }
  
  
  

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Tasks`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Create a new task
  const createTask = async () => {

    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.error("User ID not found in token.");
      return;
    }

    const taskToSend = {
      ...newTask,
      userId, // Inject userId from token
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/Tasks`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(taskToSend),
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
      const response = await fetch(`${API_BASE_URL}/api/Tasks/${editTaskId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
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
      await fetch(`${API_BASE_URL}/api/Tasks/${id}`, {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Toggle task completion
  const toggleCompletion = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/api/Tasks/ToggleComplete/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
    <div className="task-manager-container">
      <Header /> {/* Include the Header component */}
      <div className="task-manager">

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
          <AddTask
            newTask={newTask}
            setNewTask={setNewTask}
            createTask={createTask}
          />
        )}

        {/* Task List */}
        {activeTab === "active" && (
          <ActiveTasks
            tasks={activeTasks}
            toggleCompletion={toggleCompletion}
            setEditTaskId={setEditTaskId}
            setEditTask={setEditTask}
            deleteTask={deleteTask}
          />
        )}

        {activeTab === "completed" && (
          <CompletedTasks
            tasks={completedTasks}
            toggleCompletion={toggleCompletion}
            deleteTask={deleteTask}
          />
        )}

        {/* Edit Task */}
        {editTaskId && (
          <EditTask
            editTask={editTask}
            setEditTask={setEditTask}
            updateTask={updateTask}
            setEditTaskId={setEditTaskId}
          />
        )}
      </div>
    </div>
  );
}

export default TaskManager;
