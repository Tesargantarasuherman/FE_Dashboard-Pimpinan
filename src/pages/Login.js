import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/suratonlinebackend/api/index.php/login`, { 'email': email, 'password': password },{ headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'multipart/form-data',
        }}).then(res => {
            console.log(res)
        })
        console.log(password)
    }
    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row body-login">
                                <div className="col-lg-6 offset-md-3">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Selamat Datang</h1>
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