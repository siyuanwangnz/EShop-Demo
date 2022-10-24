import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { userLogin } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

export default function Login() {

    const navigate = useNavigate()

    // set email and password state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { userInfo, status, error } = useSelector((state) => state.user)

    // get previous path
    const [search, setSearch] = useSearchParams()
    const redirect = search.get('redirect') ? search.get('redirect') : '/'

    useEffect(() => {
        // navigate to previous path if login successes
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        // prevent a browser reload/refresh
        e.preventDefault()

        dispatch(userLogin({ email, password, delay: 1000 }))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {status === 'loading' && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className="mt-2" controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button className="mt-2" type="submit" variant="primary">Sign In</Button>

                <Row className="py-2">
                    <Col>
                        New Customer?{' '}
                        {/* navigate to register page with search params (previous path) */}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}