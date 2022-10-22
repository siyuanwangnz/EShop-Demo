import Home from '../pages/Home'
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import { Navigate } from 'react-router-dom'

export default [
    {
        path: "/home", element: <Home />
    },
    {
        path: "/products/:id", element: <Product />
    },
    {
        path: "/cart/:id", element: <Cart />
    },
    {
        path: "/", element: <Navigate to="/home" />
    },
]