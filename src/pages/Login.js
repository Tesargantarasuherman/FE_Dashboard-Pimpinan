import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useHistory } from "react-router-dom";
import Image from '../img/bsc.png'
const qs = require('querystring');

function Login() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem('data'));
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        if (isLogin) {
            navigate(`/home`);
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (email == 'kepaladinas@bandung.go.id' && password == '123456') {
        //     localStorage.setItem('data', JSON.stringify({
        //         login: true,
        //         role:'kepala dinas'
        //     }))
        //     navigate(`/home`);
        // }
        // if (email == 'admindashboard@bandung.go.id' && password == '123456') {
        //     localStorage.setItem('data', JSON.stringify({
        //         login: true,
        //         role:'admin'
        //     }))
        //     navigate(`/home`);
        // }
        // else {
        //     toast.error('Email tidak terdaftar atau password salah', {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
        var formdata = new FormData();
        formdata.append("email", "demo.kadis@bandung.go.id");
        formdata.append("password", "123456");
        formdata.append("regid", "123456");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://suratonline.bandung.go.id/api/index.php/", requestOptions)
            .then(response => response.json())
            .then(result => {
                localStorage.setItem('data', JSON.stringify(result.data))
                navigate(`/home`);
                console.log(result.data)
            })
            .catch(error => console.log('error', error));

        // let data = new FormData();
        // data.append('email', email);
        // data.append('password', password);
        // data.append('regid', password);

        // axios.post(`http://localhost:8080/suratonlinebackend/api/index.php/login`, data, {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }).then(res => {
        //     if (res.data.status == true) {
        //         localStorage.setItem('data',JSON.stringify(res.data.data))
        //         navigate(`/home`);
        //         console.log(res.data.data)
        //     }
        //     else{
        //         toast.error(res.data.message, {
        //             position: "top-center",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //         });
        //     }
        // }).catch(err => {
        //     toast.error('Email tidak terdaftar atau password salah', {
        //         position: "top-center",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // })
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
                                                <input type="email" name="email" className="form-control form-control-user" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter Email Address..." />
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