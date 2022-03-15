import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext,useState,useEffect } from 'react'
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import routes from '../index'
import { useNavigate } from "react-router-dom";

function MainPage(props) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('data')));
    useEffect(() => {
        if(!isLogin){
            navigate(`/`);
        }
    }, [])
    return (
            <div id="wrapper">
                {/* Render Sidebar */}
                <Routes>
                    {routes.map((route) => {
                        if (route.sidebar)
                            return <Route path={route.path} element={<Sidebar />} />;
                    })}
                </Routes>
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Navbar ----------------------------- */}
                        <Routes>
                            {routes.map((route) => {
                                if (route.navbar)
                                    return <Route path={route.path} element={<Topbar Logout={props.Logout} handleClick={props.handleClick} theme={props.theme} setThemeAction={props.setThemeAction} />
                                    } />;
                            })}
                        </Routes>
                        <div className="container-fluid">
                            {/* ---------------------------------- */}
                            {/* Render Page */}
                            <Routes>
                                {routes.map((route) => {
                                    return <Route path={route.path} element={route.component} />
                                })}
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MainPage