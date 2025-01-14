import React from 'react'

const AddTask = ({newTask, setNewTask, createTask}) => {
  return (
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
  )
}

export default AddTask
