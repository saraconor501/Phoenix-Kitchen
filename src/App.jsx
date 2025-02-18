import HomePage from './pages/Home/HomePage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/Authentication/Sign-up/Sign-up'
import Login from './pages/Authentication/Log-In/Log-In'
import Header from './components/Header/Header'
import EmpirePizza from './components/ShoopsDetails/Details'
import KFC from './components/KFC/KFC'
function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path={'/'} element={<HomePage/>} />
        <Route path={'/restaraunts/mypizza'} element={<EmpirePizza/>}/>
        <Route path={'/restaraunts/kfc'} element={<KFC/>}/>
        <Route path={'/auth/sign-up'} element={<SignUp/>}></Route>
        <Route path={'/auth/login'} element={<Login/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
