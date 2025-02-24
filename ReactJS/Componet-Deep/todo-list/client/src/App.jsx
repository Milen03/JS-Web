import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <!-- Navigation header --> */}
  <header className="navigation-header">
    <span className="navigation-logo">
      <img src="/images/todo-icon.png" alt="todo-logo" />
    </span>
    <span className="spacer"></span>
    <span className="navigation-description">Todo List</span>
  </header>

  {/* <!-- Main content --> */}
  <main className="main">

    {/* <!-- Section container --> */}
    <TodoList />
  </main>

  {/* <!-- Footer --> */}
  <footer className="footer">
    <p>Copyright © designed by Mihail Valkov</p>
  </footer>

    </>
  )
}

export default App
