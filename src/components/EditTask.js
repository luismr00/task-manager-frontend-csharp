import React from 'react'

const EditTask = ({ editTask = {}, setEditTask, updateTask, setEditTaskId }) => {
  return (
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
  )
}

export default EditTask
