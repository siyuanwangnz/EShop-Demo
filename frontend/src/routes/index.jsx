import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import { Navigate } from 'react-router-dom'

export default [
    {
        path: "/home", element: <Home />
    },
    {
        path: "/products/:id", element: <Product />
    },
    {
        path: "/login", element: <Login />
    },
    {
        path: "/register", element: <Register />
    },
    {
        path: "/profile", element: <Profile />
    },
    {
        path: "/cart/:id", element: <Cart />
    },
    {
        path: "/cart", element: <Cart />
    },
    {
        path: "/", element: <Navigate to="/home" />
    },
]