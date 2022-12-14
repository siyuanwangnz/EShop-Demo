import React, { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProduct } from '../../redux/slices/productSlice'
import { Row, Col, ListGroup, Image, Card, Button, Form } from "react-bootstrap"
import Rating from "../../components/Rating"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import './index.module.css'

export default function Product() {

    const navigate = useNavigate()

    // set item quantity state 
    const [qty, setQty] = useState(1)

    // get id (params) from router-link
    const { id } = useParams()

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { product, status, error } = useSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchProduct({ id, delay: 500 }))
    }, [dispatch, id])

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {status === 'loading' ?
                <Loader /> : error ?
                    <Message variant="danger">{error}</Message> : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity:</Col>
                                                    <Col>
                                                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map(x => (
                                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                onClick={() => {
                                                    // here send id and qty through router params and search params
                                                    // use useParms and useSearchParams to get
                                                    navigate(`/cart/${id}?qty=${qty}`)
                                                }}
                                                className="btn-block"
                                                type="button"
                                                disabled={product.countInStock === 0}>
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }
        </div>
    )
}
