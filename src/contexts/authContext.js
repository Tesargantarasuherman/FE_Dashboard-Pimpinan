import React, { createContext, Component, useReducer, useState,useEffect } from 'react'
import {
    useNavigate
} from "react-router-dom";
export const AuthContext = createContext();
const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);
    const toggleAuth = () => {
        setIsLogin(true)
    }
    return (
        <AuthContext.Provider value={{ isLogin:isLogin,setIsLogin,setIsLogin}}>
            {/* asign children to another component */}
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;