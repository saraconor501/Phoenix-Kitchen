import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/Home/HomePage';
import SignUp from './pages/Authentication/Sign-up/Sign-up';
import Login from './pages/Authentication/Log-In/Log-In';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AdminPage from './pages/Admin/AdminPage';
import CartPage from './pages/Cart/CartPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PageTransition from './hooks/TransitionPage/TransitionPage';

import './App.css';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation(); 

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/auth/sign-up" element={<PageTransition><SignUp /></PageTransition>} />
          <Route path="/auth/login" element={<PageTransition><Login /></PageTransition>} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                  <Route path="/cart" element={<PageTransition><CartPage /></PageTransition>} />
                  <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
                  <Route path="/myaccount" element={<PageTransition><AdminPage /></PageTransition>} />
                  <Route path="/restaraunts/:id" element={<PageTransition><RestaurantPage/></PageTransition>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;