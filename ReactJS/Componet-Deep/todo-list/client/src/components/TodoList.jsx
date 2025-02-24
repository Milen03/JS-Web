import { useEffect, useState } from "react";
import TodoListItem from "./TodoListItem.jsx";

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [isPenting, setIsPenting] = useState(true)
  const [newTodo, setNewTodo] = useState(null)

  console.log(todos);
  const url = 'http://localhost:3030/jsonstore/todos'
  useEffect(() => {
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

  useEffect(() => {
    if (newTodo) {
      const addTodo = async () => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo)
          })
          if (!response.ok) {
            throw new Error('Error for you Todo')

          }
          const data = await response.json()
          // Добавяме новия Todo към съществуващите
          setTodos(oldTodos => [...oldTodos, data])
           // Нулираме newTodo, за да не се задейства useEffect отново
           setNewTodo(null)
        } catch (err) {
          console.log(err.message);
        }

      }
      addTodo()
    }
  },[newTodo])  // useEffect се изпълнява всеки път когато newTodo се промени


// Функция, която се задейства при клик на бутона за добавяне на нов Todo
  const handleAddTodoClick = () =>{
    const todoToAdd = {
      text:'New ToDo',
      isCompleted:false
    }
    setNewTodo(todoToAdd)
  }


  const statusChangeHandler = (todoId) => {
    setTodos(oldTodos => oldTodos.map(todo => todo._id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo))

  }
  return (
    <>
      <section className="todo-list-container">
        <h1>Todo List</h1>

        <div className="add-btn-container">
          <button className="btn" onClick={handleAddTodoClick}>+ Add new Todo</button>
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