import React from 'react';

const ActiveTasks = ({ tasks = [], toggleCompletion, setEditTaskId, setEditTask, deleteTask }) => {
  return (
    <div>
      <h2>Active Tasks</h2>
      <ul>
        {tasks.map((task) => (
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
  );
};

export default ActiveTasks;
