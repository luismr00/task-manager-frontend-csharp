# Task Manager

A simple React-based task management application to help you manage your tasks. This project demonstrates the use of React components, state management, hooks, and interaction with an API for CRUD operations.

---

## Getting Started

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed. Download it from [Node.js Official Website](https://nodejs.org/).
2. **React App Setup**: Clone this repository to your local machine.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Navigate into the project directory:
    ```bash
    cd task-manager

3. Install the dependencies:
    ```bash
    npm install

4. Set up the .env file:
    -  Create a file named .env in the root directory.
    -  Add the following line, replacing <API_URL> with your backend API URL:
        ```bash
        REACT_APP_API_BASE_URL=<API_URL>
    - Example:
        ```bash
        REACT_APP_API_BASE_URL=https://your-api


### Main Files
Here are the key files you'll be interacting with:

1. **`src/index.js`**:
   - The entry point for the React app.
   - Renders the main `App` component into the DOM.

2. **`src/App.js`**:
   - Acts as a wrapper for routing and other global configurations.

3. **`src/TaskManager.js`**:
   - The heart of the application.
   - Manages state, API interactions, and renders the main layout.

4. **`src/components`**:
   - Contains reusable components:
     - **`AddTask.js`**: Handles task creation.
     - **`ActiveTasks.js`**: Displays active tasks.
     - **`CompletedTasks.js`**: Displays completed tasks.
     - **`EditTask.js`**: Handles task editing.

5. **`src/App.css`**:
   - Contains styles for the app.

### Other Files
- **`public/`**:
  - Contains static files like the `index.html` template and assets.
- **`.gitignore`**:
  - Lists files and directories that should not be committed to version control.
- **`package.json`**:
  - Holds metadata about the project and dependencies.
- **`package-lock.json`**:
  - Records the exact versions of dependencies for consistent installs.


## Explanation of Key Features

### Tabs for Task Management
- The app includes two tabs: **Active** and **Completed**.
- **Active Tab**:
  - Displays tasks that are not yet completed.
  - Includes options to mark tasks as complete, edit, or delete them.
- **Completed Tab**:
  - Displays tasks that are marked as completed.
  - Includes options to mark tasks as incomplete or delete them.

### API Integration
- The app interacts with a backend API for CRUD operations using `fetch`.
- **Endpoints**:
  - `GET`: Fetch all tasks.
  - `POST`: Create a new task.
  - `PUT`: Update an existing task or toggle completion.
  - `DELETE`: Remove a task.

### State Management with `useState`
- `tasks`: Stores all tasks fetched from the backend.
- `newTask`: Stores details for creating a new task.
- `editTask` and `editTaskId`: Handle editing an existing task.
- `activeTab`: Tracks the currently selected tab (Active or Completed).

### Side Effects with `useEffect`
- The `fetchTasks` function is called once on component mount to load tasks from the backend.

### Filtering Tasks
- Tasks are filtered into **active** and **completed** categories:
  ```javascript
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

### Modular Components

The application is structured into smaller, reusable components for better organization and maintainability. Here's an overview of the main components:

#### **1. `AddTask.js`**
- **Purpose**:
  - Provides a form for creating new tasks.
- **Props**:
  - `newTask`: Holds the task data being entered.
  - `setNewTask`: Updates the form data as the user inputs details.
  - `createTask`: Function to add the new task via the backend.

#### **2. `ActiveTasks.js`**
- **Purpose**:
  - Displays the list of tasks that are not completed.
  - Includes buttons for marking tasks as complete, editing, or deleting.
- **Props**:
  - `tasks`: Array of active tasks.
  - `toggleCompletion`: Function to mark tasks as complete.
  - `setEditTaskId`: Sets the task ID for editing.
  - `setEditTask`: Sets the task details for the edit form.
  - `deleteTask`: Deletes a task.

#### **3. `CompletedTasks.js`**
- **Purpose**:
  - Displays the list of tasks that are completed.
  - Includes buttons for marking tasks as incomplete or deleting.
- **Props**:
  - `tasks`: Array of completed tasks.
  - `toggleCompletion`: Function to mark tasks as incomplete.
  - `deleteTask`: Deletes a task.

#### **4. `EditTask.js`**
- **Purpose**:
  - Provides a form to edit an existing task's details.
- **Props**:
  - `editTask`: Holds the task data being edited.
  - `setEditTask`: Updates the task data as the user edits.
  - `updateTask`: Function to save the updated task via the backend.
  - `setEditTaskId`: Clears the editing state when canceled.

---

Each component focuses on a specific task, making the codebase easier to understand and extend. By passing props to these components, they remain flexible and reusable.

## Key React Concepts Explained

This section explains the React concepts used in the application in simple terms:

### **1. React Functional Components**
- The application uses **functional components**, such as `TaskManager` and the components in the `components` folder.
- **Why Functional Components?**
  - They are simple, clean, and easier to work with compared to class components.
  - They support modern React features like **hooks**.

### **2. State Management (`useState`)**
- **What is `useState`?**
  - A React hook that allows components to manage their own state.
  - Example: 
    ```javascript
    const [tasks, setTasks] = useState([]);
    ```
    - `tasks` is the state variable to hold the task data.
    - `setTasks` is the function to update the state.

- **State Variables Used**:
  - `tasks`: Stores all tasks fetched from the backend.
  - `newTask`: Holds details of the task being created.
  - `editTask` and `editTaskId`: Manage editing-related states.
  - `activeTab`: Tracks the currently active tab (Active or Completed).

### **3. Side Effects with `useEffect`**
- **What is `useEffect`?**
  - A React hook that performs side effects like fetching data from an API or setting up event listeners.
  - Example:
    ```javascript
    useEffect(() => {
      fetchTasks();
    }, []);
    ```
    - Runs the `fetchTasks` function once when the component mounts.

### **4. Props**
- **What are Props?**
  - Props (short for "properties") allow data to be passed from a parent component to a child component.
  - Example:
    ```javascript
    <ActiveTasks
      tasks={activeTasks}
      toggleCompletion={toggleCompletion}
      setEditTaskId={setEditTaskId}
      setEditTask={setEditTask}
      deleteTask={deleteTask}
    />
    ```
    - Here, the `ActiveTasks` component receives several props for rendering and handling actions.

### **5. Conditional Rendering**
- The app uses conditional rendering to display different components or parts of the UI based on the current state.
- Example:
  ```javascript
  {activeTab === "active" && (
    <AddTask
      newTask={newTask}
      setNewTask={setNewTask}
      createTask={createTask}
    />
  )}