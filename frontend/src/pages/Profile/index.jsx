import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

export default function Profile() {

    const navigate = useNavigate()

    // set email, password, confirmed password, password message state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState(null)

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { userInfo, status, error } = useSelector((state) => state.user)

    useEffect(() => {
        // navigate to login page if user is not logged in
        if (!userInfo) {
            navigate('/login')
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo])

    const submitHandler = (e) => {
        // prevent a browser reload/refresh
        e.preventDefault()

        if (password !== confirmedPassword) {
            setPasswordMessage('Passwords do not match')
        } else {
            dispatch(updateProfile({ updatedUser: { name, email, password }, delay: 1000 }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {passwordMessage && <Message variant="danger">{passwordMessage}</Message>}

                {status === 'loading' ?
                    <Loader /> : error ?
                        <Message variant="danger">{error}</Message> : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mt-2" controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="mt-2" controlId='email'>
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

                                <Form.Group className="mt-2" controlId='confirmedPassword'>
                                    <Form.Label>Confirmed Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter confirmed password"
                                        value={confirmedPassword}
                                        onChange={(e) => setConfirmedPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button className="mt-2" type="submit" variant="primary">Update</Button>
                            </Form>
                        )}
            </Col>


        </Row>
    )
}