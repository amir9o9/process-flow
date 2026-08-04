# Process Tracker

A simple React + Vite app for creating processes and organizing related tasks. It is designed to help you track work items in a lightweight, visual board-style layout.

## Features

- Add new processes with a title
- Add tasks under each process
- Mark tasks as complete or incomplete
- Delete individual tasks or remove an entire process with its tasks
- Clean, card-based UI with responsive layout

## Tech Stack

- React
- Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal

### Build

To create a production build:

```bash
npm run build
```

### Lint

To check for linting issues:

```bash
npm run lint
```

## Project Structure

- src/App.jsx - main app logic and process/task state
- src/Wrapper.jsx - renders process cards
- src/ProcessCard.jsx - UI for an individual process and its tasks
- src/Header.jsx - app header
- src/App.css and src/index.css - styling

## License

This project is open for personal and educational use.
