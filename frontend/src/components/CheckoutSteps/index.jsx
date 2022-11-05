import React from 'react'
import { Link } from 'react-router-dom'

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <ul className=" nav nav-tabs justify-content-center mb-4 fs-4">
            <li className="nav-item">
                {step1 ? (
                    <Link className="nav-link" to="/login">Log In</Link>
                ) : (
                    <Link className="nav-link disabled">Log In</Link>
                )}
            </li>
            <li className="nav-item">
                {step2 ? (
                    <Link className="nav-link" to="/shipping">Shipping</Link>
                ) : (
                    <Link className="nav-link disabled">Shipping</Link>
                )}
            </li>

            <li className="nav-item">
                {step3 ? (
                    <Link className="nav-link" to="/payment">Payment</Link>
                ) : (
                    <Link className="nav-link disabled">Payment</Link>
                )}
            </li>

            <li className="nav-item">
                {step4 ? (
                    <Link className="nav-link" to="/placeorder">Place Order</Link>
                ) : (
                    <Link className="nav-link disabled">Place Order</Link>
                )}
            </li>
        </ul>
    )
}
