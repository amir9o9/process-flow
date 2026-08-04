import { useState } from 'react'

// Display a single process card with its tasks and actions.
function ProcessCard({ process, tasks, onToggleTask, onDeleteTask, onDeleteProcess, onAddTask }) {
  // Input value for adding a new task inside this process.
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Submit handler for adding a task to the current process.
  function handleAddTask(event) {
    event.preventDefault()
    onAddTask(process.id, newTaskTitle)
    setNewTaskTitle('')
  }

  return (
    <section className='w-80 rounded-2xl border border-[#B9C7E0] bg-[#EFF1F3] p-4'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='font-semibold'>{process.title}</h3>
        <button type='button' onClick={() => onDeleteProcess(process.id)} className='text-sm text-red-500'>Delete Process</button>
      </div>

      {/* List of tasks related to this process. */}

      <main className='rounded-2xl bg-[#ffffff] p-2'>
        <ul className='space-y-2'>
          {tasks.length === 0 ? (
            <li className='text-sm text-gray-500'>Add New Tasks here</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className='flex items-center justify-between gap-2'>
                <label className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                  />
                  <span className={task.completed ? 'text-gray-500 line-through' : ''}>{task.title}</span>
                </label>

                <button type='button' onClick={() => onDeleteTask(task.id)} className='text-red-500'>x</button>
              </li>
            ))
          )}
        </ul>

        {/* Form for adding a new task to this process. */}
        <form onSubmit={handleAddTask} className='mt-3 flex gap-2'>
          <input
            value={newTaskTitle}
            onChange={event => setNewTaskTitle(event.target.value)}
            placeholder=' New Task'
            className='flex-1 rounded border border-[#B9C7E0] px-2 py-1'
          />
          <button type='submit' className='rounded bg-[#842BD2] px-2 py-1 text-white'>+</button>
        </form>
      </main>
    </section>
  )
}

export default ProcessCard
