import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useHistory } from "react-router-dom";
import Image from '../img/bsc.png'
function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('login'));
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (isLogin) {
            navigate(`/home`);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email == 'kepaladinas@bandung.go.id' && password == '123456') {
            localStorage.setItem('login', true)
            navigate(`/home`);
        }
        else {
            toast.error('Email tidak terdaftar atau password salah', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        // axios.post(`http://localhost:8080/suratonlinebackend/api/index.php/login`, { 'email': email, 'password': password },{ headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //     'Content-Type': 'multipart/form-data',
        // }}).then(res => {
        //     console.log(res)
        // })
        // console.log(password)
    }
    return (
        <div className="container" style={{ minHeight: '100vh' }}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row body-login">
                                <div className="col-lg-6 offset-md-3">
                                    <div className="p-5">
                                        <img src={Image} alt="" srcset="" className='w-100' />
                                        <div className="text-center">
                                            <h6 className="h6 text-gray-600 font-weight-bold mb-4">DASHBOARD PIMPINAN</h6>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control form-control-user" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                        <hr />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login