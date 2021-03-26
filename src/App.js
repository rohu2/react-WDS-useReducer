import React, { useReducer, useState } from 'react';
import './App.css';
import Todo from './Todos'



const ACTIONS = {


  TOGGLE_TODO: 'toggle todo',

  NEW_TODO: 'new todo',

  DELETE_TODO: 'delete todo',

}



function App() {

const [todos, dispatch] = useReducer(reducer, []);
const [name, setName] = useState('')


function reducer(todos, action) {

switch (action.type) {

  case ACTIONS.TOGGLE_TODO:
    return todos.map( todo => todo.id === action.payload.id ? { ...todo, complete:!todo.complete }  : todo  )
        
  case ACTIONS.NEW_TODO:
    return [...todos, newTodo(action.payload.name)]
      
  case ACTIONS.DELETE_TODO:
    return todos.filter( todo => todo.id !== action.payload.id  )
    
  default:
    break;

  }
}


function newTodo(name) {

return { id: Date.now(), name: name, complete: false }

}


function handleSubmit(e) {

e.preventDefault()
dispatch({ type: ACTIONS.NEW_TODO, payload: { name: name } })
setName('')

}


return (
    <div className='container'>
      <form action="" 
      onSubmit={handleSubmit}>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />

      </form>

      {todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)}
    
    </div>
  );
}



export default App;
export { ACTIONS }