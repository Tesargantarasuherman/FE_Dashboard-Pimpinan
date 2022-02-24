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
import { useEffect, useState } from 'react';
import { SidebarContext } from './contexts/sidebar';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  // useEffect(()=>{
  //   if(isLogin){
  //     window.location.href = "/dashboard";
  //   }
  // },[isLogin])
  return (

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
  );
}

export default App;
