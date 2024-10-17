import React from 'react'

const Signup = () => {
    return (
        <div>
            <h1>Signup</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />

                <label htmlFor="contactNo">Contact No</label>
                <input type="tel" id="contactNo" name="contactNo" required />

                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Up</button>

            </form>
        </div>
    )
}

export default Signup
