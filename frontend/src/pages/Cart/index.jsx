import React, { useEffect } from 'react'
import { useSearchParams, useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import Message from '../../components/Message'
import { addToCart } from '../../redux/slices/cartSlice'
import './index.module.css'

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
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ?
                    (
                        <Message>
                            Your cart is empty <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item._id}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/products/${item._id}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control
                                                as="select"
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart({ id: item._id, qty: Number(e.target.value) }))}>
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                type="button"
                                                variant="light">
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                            </h2>
                            $
                            {cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0} >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}
