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
import 'mapbox-gl/dist/mapbox-gl.css';
import 'leaflet/dist/leaflet.css';


function App() {
  const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('data')));
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
      </SidebarContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
