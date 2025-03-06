import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import SignUp from './pages/Authentication/Sign-up/Sign-up';
import Login from './pages/Authentication/Log-In/Log-In';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import EmpirePizza from './components/ShoopsDetails/Details';
import KFC from './components/KFC/KFC';
import Papajonhs from './components/Papajonhs/Papajonhs';
import AdminPage from './pages/Admin/AdminPage';
import Navat from './components/Navat/Navat';
import './App.css';
import CartPage from './pages/Cart/CartPage';



function Layout({ children }) {
  return (
    <div className={'layout'}>
      <Header />
      <main className={'content'}>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/auth/sign-up" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />

    
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/basket" element={<CartPage></CartPage>} />
              <Route path="/myaccount" element={<AdminPage />} />
              <Route path="/restaraunts/mypizza" element={<EmpirePizza />} />
              <Route path="/restaraunts/navat" element={<Navat />} />
              <Route path="/restaraunts/kfc" element={<KFC />} />
              <Route path="/restaraunts/papajonhs" element={<Papajonhs />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;