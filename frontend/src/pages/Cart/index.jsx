import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSearchParams, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'

export default function Cart() {
    // get item quantity (search params) from router-useNavigate
    const [search, setSearch] = useSearchParams()
    const qty = Number(search.get('qty'))

    //get id (params) from router-useNavigate
    const { id } = useParams()

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(addToCart({ id, qty, delay: 500 }))
    }, [dispatch, id, qty])

    return (
        <div>
            Cart
            id: {id}
            Quantity: {search.get('qty')}
        </div>
    )
}
