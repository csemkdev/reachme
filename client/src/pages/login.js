import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authAction'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {
    const initialState = { email: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData

    const [typePass, setTypePass] = useState(false)

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if (auth.token) history.push("/")
    }, [auth.token, history])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(userData))
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>

                <div style={{ textAlign: "center", margin: '20px' }} >
                    <div style={{ display: "flex", color: '#636060' }} className="navbar-brand p-0 m-0">
                        <div style={{
                            textAlign: "center",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <img style={{ width: '64px', height: '64px' }} src="https://res.cloudinary.com/mayurkamble/image/upload/v1625477279/icon/ReachMe2_pnioxk.png" />
                        </div>
                        <div>
                            <h1 style={{ margin: '0' }}>ReachMe</h1>
                            <h6 style={{ margin: '0' }}>Social Networking Platforms</h6>
                        </div>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                        aria-describedby="emailHelp" onChange={handleChangeInput} value={email} />

                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                    <div className="pass">

                        <input type={typePass ? "text" : "password"}
                            className="form-control" id="exampleInputPassword1"
                            onChange={handleChangeInput} value={password} name="password" />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>

                    </div>

                    <small className="form-text text-muted">
                        <Link to="/forgot_password" >Forgot Password</Link>
                    </small>

                </div>

                <button type="submit" className="btn btn-primary w-100"
                    disabled={email && password ? false : true}>
                    Login
                </button>

                <p className="my-2">
                    You don't have an account? <Link to="/register" style={{ color: "crimson" }}>Register Now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login
