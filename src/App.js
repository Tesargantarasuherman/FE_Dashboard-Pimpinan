import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import MainPage from './routes/main/MainPage';
import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from './contexts/sidebar';
import { AuthContext } from './contexts/authContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('login'));
  const [sidebar, setSidebar] = useState(true);
  useEffect(() => {
    console.log(isLogin)
  }, [])
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <SidebarContext.Provider value={{ sidebar, setSidebar }}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
        {/* {
        isLogin ?
          <MainPage />
          :
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
      } */}
        {/* <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> */}
      </SidebarContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
