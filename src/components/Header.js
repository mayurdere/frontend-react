import React, { useContext, useEffect } from 'react'
import UserContext from '../context/user-context'
import { Link  } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
    const user = useContext(UserContext);
    
    const logoutClicked = (e) => {
        e.preventDefault()
        axios.post('api/auth/logout')
            .then(function (response) {
                localStorage.clear()
                console.log(response)
                window.location.reload(false);
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    return (
        <div>
            <header>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
                    <Link className="my-0 mr-md-auto font-weight-normal text-white" to="/">Routers</Link>
                    {user ?
                        <nav className="my-2 my-md-0 mr-md-3">
                            <span className="p-2 text-white">Welcome {user.name}</span>
                            <Link className="p-2 text-white btn" to="/">Home</Link>
                            <Link className="p-2 text-white btn" to="/#" onClick={logoutClicked}>Logout</Link>
                        </nav>
                        :
                        <nav className="my-2 my-md-0 mr-md-3">
                            <Link className="p-2 text-white btn" to="/login">Login</Link>
                            <Link className="btn btn-outline-primary" to="/signup">Sign up</Link>
                        </nav>
                    }

                </div>
            </header>
        </div>
    );
}

export default Header;