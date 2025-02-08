
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import SignUp from './pages/Authentication/Sign-up/Sign-up'

function App() {


  return (
    <>
      <Routes>
        <Route path={'/'} element={<Link to={'/auth/sign-up'}>Main Page</Link>} />
        <Route path={'/auth/sign-up'} element={<SignUp></SignUp>}></Route>
      </Routes>

    </>
  )
}

export default App
