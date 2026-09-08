import { useState } from 'react'
import Header from './Header'
import Wrapper from '../Wrapper'
import './App.css'


// Generate a simple unique id for processes and tasks.
function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`
}

function App() {
  // Store all processes in the parent component.
  const [processes, setProcesses] = useState([])

  // Store all tasks in the parent component.
  const [tasks, setTasks] = useState([])

  // Input value for creating a new process.
  const [newProcessTitle, setNewProcessTitle] = useState('')

  // Toggle the completed state of a task.
  function toggleTask(taskId) {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Remove a single task from the list.
  function deleteTask(taskId) {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  // Update an existing task's fields (called by ProcessCard onSave).
  function updateTask(taskId, updatedFields) {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, ...updatedFields } : t)))
  }

  // Remove a process and all tasks belonging to it.
  function deleteProcess(processId) {
    setProcesses(prev => prev.filter(process => process.id !== processId))
    setTasks(prev => prev.filter(task => task.processId !== processId))
  }

  // Add a new task to a specific process.
  function addTask(processId, title) {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    const newTask = {
      id: createId('task'),
      processId,
      title: trimmedTitle,
      completed: false,
      createdAt: Date.now()
    }

    setTasks(prev => [...prev, newTask])
  }

  // Add a new process to the list.
  function addProcess(title) {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) return

    const newProcess = {
      id: createId('process'),
      title: trimmedTitle,
      createdAt: Date.now()
    }

    setProcesses(prev => [...prev, newProcess])
  }

  // Submit handler for creating a new process.
  function handleAddProcess(event) {
    event.preventDefault()
    addProcess(newProcessTitle)
    setNewProcessTitle('')
  }

  return (
    <main>
      <Header />

      <section className='mx-4 my-4 flex flex-col gap-2 rounded-2xl border border-[#B9C7E0] bg-white p-4 shadow-sm md:flex-row md:items-center'>
        <form onSubmit={handleAddProcess} className='flex flex-1 gap-2'>
          <input
            value={newProcessTitle}
            onChange={event => setNewProcessTitle(event.target.value)}
            placeholder='your new process title'
            className='flex-1 rounded border border-[#B9C7E0] px-3 py-2'
          />
          <button type='submit' className='rounded bg-[#842BD2] px-4 py-2 text-white'>Add Process</button>
        </form>
      </section>

      <Wrapper
        processes={processes}
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onDeleteProcess={deleteProcess}
        onAddTask={addTask}
        onUpdateTask={updateTask}
      />
    </main>
  )
}

export default App