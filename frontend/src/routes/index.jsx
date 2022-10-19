import Home from '../pages/Home'
import Product from '../pages/Product'
import { Navigate } from 'react-router-dom'

export default [
    {
        path: "/home", element: <Home />
    },
    {
        path: "/products/:id", element: <Product />
    },
    {
        path: "/", element: <Navigate to="/home" />
    },
]