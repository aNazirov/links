import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = ()=>{
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(()=> {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHendler = event =>{
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const registerHendler = async ()=>{
        try {
            const data = await request('POST', '/api/auth/register', {...form})
            message(data.message)
        } catch (err) {
        }
    }
    const loginHendler = async ()=>{
        try {
            const data = await request('POST', '/api/auth/login', {...form})
            auth.login(data.token, data.userId)
        } catch (err) {
        }
    }




    return (
        <div className="row">
        <div className="col s6 offset-s3">
            <div className="card blue darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Authenticate</span>
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" type="email" className="validate yellow-input" name="email" value={form.email} onChange={changeHendler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="password" type="password" className="validate yellow-input" name="password" value={form.password} onChange={changeHendler}/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button className="btn yellow darken-4" style={{marginRight: 10}} onClick={loginHendler} disabled={loading}>LogIn</button>
                    <button className="btn grey lighten-1 black-text" onClick={registerHendler} disabled={loading}>SignUp</button>
                </div>
                </div>
        </div>
    </div>
    )
}