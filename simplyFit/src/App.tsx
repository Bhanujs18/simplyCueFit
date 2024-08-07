import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import Navbar from "./components/Navbar/Navbar"
import Challenges from "./pages/Challenges/Challenges"
import { useState } from "react"

const App = () => {
  const [addTask , setAddTask]  = useState<boolean>(false)
  return (
    <BrowserRouter>
    <Navbar setAddTask={setAddTask}/>
    <Routes>
      <Route path={"/"} element={<Dashboard />} />
      <Route path={"/challenges"} element={<Challenges addTask={addTask} setAddTask={setAddTask} />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App