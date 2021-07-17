import React, { useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/authContext'
import {useHttp} from '../hooks/http.hook'
import {useHistory} from 'react-router-dom'

export const CreatePage = ()=>{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHendler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('POST', '/api/link/generate', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.link._id}`)
            } catch (err) {
                
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input id="link" type="text" value={link} onChange={e => setLink(e.target.value)} onKeyPress={pressHendler}/>
                    <label htmlFor="link">Enter your link</label>
                </div>
            </div>
        </div>
    )
}