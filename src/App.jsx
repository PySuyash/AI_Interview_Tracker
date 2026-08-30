import Home from "./Pages/Home/Home"
import Dashboard from "./Pages/Dashboard/Dashboard"
import CreateInterview from "./Pages/CreateInterview/CreateInterview"
import Interview from "./Pages/Interview/Interview"
import History from "./Pages/History/History"
import CLS from "./Pages/ClearLocalStorage/CLS"
import MockInterview from "./Pages/MockInterview/MockInterview"
import NotFound from "./Pages/NotFound/NotFound"

import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/createinterview" element={<CreateInterview/>}/>
        <Route path="/interview" element={<Interview/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/clearlocalstorage" element={<CLS/>}/>
        <Route path="/mockinterview" element={<MockInterview/>}/>
        <Route path="/createinterview/mockinterview" element={<MockInterview/>}/>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
