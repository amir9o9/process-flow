import { useState, useEffect } from 'react'

// Display a single process card with its tasks and actions.
// Adds inline-edit capability for individual tasks via the `onUpdate` prop.
function ProcessCard({ process, tasks, onToggleTask, onDeleteTask, onDeleteProcess, onAddTask, onUpdate }) {
  // Input value for adding a new task inside this process.
  const [newTaskTitle, setNewTaskTitle] = useState('')

  // Track which task is currently being edited and its draft title.
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [draftTitle, setDraftTitle] = useState('')

  // When the tasks prop changes, ensure the draft reflects up-to-date values
  // for the currently edited task (if any).
  useEffect(() => {
    const task = tasks.find(t => t.id === editingTaskId)
    if (task) setDraftTitle(task.title)
  }, [tasks, editingTaskId])

  // Submit handler for adding a task to the current process.
  function handleAddTask(event) {
    event.preventDefault()
    onAddTask(process.id, newTaskTitle)
    setNewTaskTitle('')
  }

  // Start editing a task: set the editing id and initialize draft.
  function startEdit(task) {
    setEditingTaskId(task.id)
    setDraftTitle(task.title)
  }

  // Cancel inline editing and discard draft changes.
  function cancelEdit() {
    setEditingTaskId(null)
    setDraftTitle('')
  }

  // Save the draft by calling the provided `onUpdate` callback.
  function saveEdit(taskId) {
    const trimmed = draftTitle.trim()
    if (!trimmed) return // simple validation: require non-empty title
    onUpdate?.(taskId, { title: trimmed })
    setEditingTaskId(null)
    setDraftTitle('')
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
                <div className='flex items-center gap-2'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => onToggleTask(task.id)}
                  />

                  {/* If this task is being edited show an input, otherwise show text. */}
                  {editingTaskId === task.id ? (
                    <input
                      value={draftTitle}
                      onChange={e => setDraftTitle(e.target.value)}
                      className='rounded border px-2 py-1'
                    />
                  ) : (
                    <span className={task.completed ? 'text-gray-500 line-through' : ''}>{task.title}</span>
                  )}
                </div>

                <div className='flex items-center gap-2'>
                  {/* If editing show save/cancel, otherwise show edit/delete. */}
                  {editingTaskId === task.id ? (
                    <>
                      <button type='button' onClick={() => saveEdit(task.id)} className='rounded bg-green-500 px-2 py-1 text-white'>Save</button>
                      <button type='button' onClick={cancelEdit} className='rounded border px-2 py-1'>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button type='button' onClick={() => startEdit(task)} className='rounded border px-2 py-1'>Edit</button>
                      <button type='button' onClick={() => onDeleteTask(task.id)} className='text-red-500'>x</button>
                    </>
                  )}
                </div>
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
