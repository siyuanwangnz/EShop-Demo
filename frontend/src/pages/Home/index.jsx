import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/slices/productsSlice'
import Product from '../../components/Product'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

export default function Home() {
    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { products, status, error } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts({ delay: 1000 }))
    }, [dispatch])

    return (
        <div>
            <h1>Products</h1>
            {status === 'loading' ?
                <Loader /> : error ?
                    <Message variant="danger">{error}</Message> : (
                        <Row>
                            {
                                products.map(product => (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))
                            }
                        </Row>
                    )
            }
        </div>
    )
}
