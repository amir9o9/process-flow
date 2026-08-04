import ProcessCard from './src/ProcessCard'

// Render all process cards and pass the necessary handlers and data to each one.
function Wrapper({ processes, tasks, onToggleTask, onDeleteTask, onDeleteProcess, onAddTask }) {
  return (
    <main className='mx-4 my-4 flex flex-wrap gap-4'>
      {processes.map(process => (
        // Filter tasks that belong to the current process.
        <ProcessCard
          key={process.id}
          process={process}
          tasks={tasks
            .filter(task => task.processId === process.id)
            .sort((a, b) => a.createdAt - b.createdAt)}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onDeleteProcess={onDeleteProcess}
          onAddTask={onAddTask}
        />
      ))}
    </main>
  )
}

export default Wrapper
