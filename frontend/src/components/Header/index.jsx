import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../redux/slices/userSlice'

export default function Header() {

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { userInfo, status, error } = useSelector((state) => state.user)

    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ fontSize: "1.6rem", fontWeight: "bold" }} to="/">DEMO</Link>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <Link className="nav-link" to="/cart">
                            <i className="fas fa-shopping-cart" />{' '}CART
                        </Link>
                        {userInfo ? (
                            <li className="nav-item dropdown" id='username'>
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-user"></i>{' '}{userInfo.name}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><button className="dropdown-item" onClick={logoutHandler}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <Link className="nav-link" to="/login">
                                <i className="fas fa-user" />{' '}LOG IN
                            </Link>
                        )}
                    </ul>
                </div>
            </nav >
        </header >
    )
}

