import { useState } from 'react'
import './App.css'
import Timers from './components/Timers.jsx'
import Input from './components/Input.jsx';

function App() {
  const [show, setShow] = useState(false);

  const showButtonHandler = () => {
      setShow(state => !state);
  }

  return (
      <>
          <h1>UseEffect Hook</h1>

          <button onClick={showButtonHandler}>{show ? 'Hide' : 'Show'} Input</button>

         

          <hr />

          {show && <Timers />}
          <hr />
          {show && <Input />}
      </>
  )
}

export default App