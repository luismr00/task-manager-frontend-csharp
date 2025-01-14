import React from 'react'

const CompletedTasks = ({ tasks = [], toggleCompletion, deleteTask }) => {
  return (
    <div>
        <h2>Completed Tasks</h2>
        <ul>
        {tasks.map((task) => (
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
  )
}

export default CompletedTasks
