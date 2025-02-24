import { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem.jsx";

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [isPenting, setIsPenting] = useState(true)

  console.log(todos);

  useEffect(() => {
    const url = 'http://localhost:3030/jsonstore/todos'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const result = Object.values(data)
        setTodos(result)
        setIsPenting(false)
      })
      .catch(err => {
        console.log(err.message);

      })
  }, [])
  
  const statusChangeHandler = (todoId) =>{
   setTodos(oldTodos => oldTodos.map(todo=> todo._id === todoId ? {...todo, isCompleted: !todo.isCompleted}: todo))
    
  }
  return (
    <>
      <section className="todo-list-container">
        <h1>Todo List</h1>

        <div className="add-btn-container">
          <button className="btn">+ Add new Todo</button>
        </div>

        <div className="table-wrapper">

          {/* <!-- Loading spinner - show the load spinner when fetching the data from the server--> */}
          {isPenting && (
            <div className="loading-container">
              <div className="loading-spinner">
                <span className="loading-spinner-text">Loading</span>
              </div>
            </div>
          )}


          {/* <!-- Todo list table --> */}
          <table className="table">
            <thead>
              <tr>
                <th className="table-header-task">Task</th>
                <th className="table-header-status">Status</th>
                <th className="table-header-action">Action</th>
              </tr>
            </thead>
            <tbody>

              {/* <!-- Todo item --> */}
              {todos.map(todo =>
                <TodoListItem
                  key={todo._id}
                  _id={todo._id}
                  text={todo.text}
                  isCompleted={todo.isCompleted}
                  onStatusChange={statusChangeHandler}
                />
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}