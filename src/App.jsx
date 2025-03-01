import HomePage from './pages/Home/HomePage'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/Authentication/Sign-up/Sign-up'
import Login from './pages/Authentication/Log-In/Log-In'
import Header from './components/Header/Header'
import EmpirePizza from './components/ShoopsDetails/Details'
import KFC from './components/KFC/KFC'
import Papajonhs from './components/Papajonhs/Papajonhs'
import Basket from './components/Basket/Basket'
import AdminPage from './pages/Admin/AdminPage'
import Navat from './components/Navat/Navat'
function App() {

  return (
    <>
    <Header/>
      <Routes>
        <Route path={'/'} element={<HomePage/>} />
        <Route path={'/basket'} element={<Basket/>}/>
        <Route path={'/myaccount'} element={<AdminPage/>}/>
        <Route path={'/restaraunts/mypizza'} element={<EmpirePizza/>}/>
        <Route path={'/restaraunts/navat'} element={<Navat/>}/>
        <Route path={'/restaraunts/kfc'} element={<KFC/>}/>
        <Route path={'/restaraunts/papajonhs'} element={<Papajonhs/>}/>
        <Route path={'/auth/sign-up'} element={<SignUp/>}></Route>
        <Route path={'/auth/login'} element={<Login/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </>
  )
}

export default App