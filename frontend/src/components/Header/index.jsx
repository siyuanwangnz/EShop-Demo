import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" style={{ fontSize: "1.6rem", fontWeight: "bold" }} to="/">DEMO</Link>
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="fas fa-shopping-cart" />
                                CART
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="fas fa-user" />
                                LOG IN
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header >
    )
}

