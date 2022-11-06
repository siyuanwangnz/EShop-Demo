import React, { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getOrder, payOrder, deliverOrder } from '../../redux/slices/orderSlice'

export default function Order() {
    const navigate = useNavigate()

    // get id (params) from router-link
    const { id } = useParams()

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { order, status, error } = useSelector((state) => state.order)
    const { userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        // navigate to login page if user is not logged in
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(getOrder({ id, delay: 1000 }))
        }
    }, [dispatch, id])

    const paymentHandler = (isPaid) => {
        dispatch(payOrder({ id, isPaid, delay: 1000 }))
    }

    const deliverHandler = (isDelivered) => {
        dispatch(deliverOrder({ id, isDelivered, delay: 1000 }))
    }

    return status === 'loading' ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        order &&
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                {order.shippingAddress.postalCode},{" "}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    disabled={order.isPaid}
                                    onClick={() => paymentHandler(true)}>
                                    Pay For Bill
                                </Button>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    disabled={order.isDelivered}
                                    onClick={() => deliverHandler(true)}>
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
