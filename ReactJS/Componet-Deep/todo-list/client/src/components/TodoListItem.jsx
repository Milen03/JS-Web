import style from './TodoListItem.module.css'

export default function TodoListItem({
    text,
    isCompleted,
    onStatusChange,
    _id
}){
    const todoClassNames = [style['todo']]
    if(isCompleted){
        todoClassNames.push(style['is-completed'])
    }
    return (
        <>
        <tr className={todoClassNames.join(' ')}>
              <td>{text}</td>
              <td>{isCompleted ? 'Complete':'Incomplete'}</td>
              <td className="todo-action">
                <button onClick={()=>onStatusChange(_id)} className="btn todo-btn">Change status</button>
              </td>
            </tr>
        </>
    )
}