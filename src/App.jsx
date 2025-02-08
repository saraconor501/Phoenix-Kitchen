
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Authentication/Sign-up/Sign-up'
import Login from './pages/Authentication/Log-In/Log-In'

function App() {


  return (
    <>
      <Routes>
        <Route path={'/'} element={<Link to={'/auth/sign-up'}>Main Page</Link>} />
        <Route path={'/auth/sign-up'} element={<SignUp></SignUp>}></Route>
        <Route path={'/auth/login'} element={<Login></Login>}></Route>
      </Routes>

    </>
  )
}

export default App
