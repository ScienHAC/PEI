import React from 'react'

const Login = () => {
    return (
        <>
            <h1>Login</h1>
            <form>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default Login
