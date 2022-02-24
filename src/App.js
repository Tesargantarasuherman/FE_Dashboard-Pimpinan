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

function App() {
  const [isLogin, setIsLogin] =  useState(false);
  const [sidebar, setSidebar] = useState(true);
  // useEffect(()=>{
  //   if(isLogin){
  //     window.location.href = "/dashboard";
  //   }
  // },[isLogin])
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {
        isLogin ?
          <MainPage />
          :
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
      }
      {/* <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} /> */}
    </SidebarContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
