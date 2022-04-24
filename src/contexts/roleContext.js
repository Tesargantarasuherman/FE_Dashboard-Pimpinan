import React, { createContext, Component, useReducer, useState,useEffect } from 'react'
import {
    useNavigate
} from "react-router-dom";
export const AuthContext = createContext();
const AuthContextProvider = (props) => {
    const [isRole, setIsRole] = useState('');

    return (
        <AuthContext.Provider value={{ isRole:isRole,setIsRole:setIsRole}}>
            {/* asign children to another component */}
            {props.children}
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;