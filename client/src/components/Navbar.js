import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export const Navbar = () => {
    const history = useHistory()
    const auth  = useContext(AuthContext)

    const logoutHendler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
            <a href="/" className="brand-logo">Logo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><a href="/" onClick={logoutHendler}>LogOut</a></li>
            </ul>
            </div>
        </nav>
        
    )
}