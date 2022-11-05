import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../redux/slices/cartSlice'
import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'

export default function Payment() {
    const navigate = useNavigate()

    // get action and reducer from redux store
    const dispatch = useDispatch()
    const { shippingAddress, paymentMethod } = useSelector((state) => state.cart)

    // !shippingAddress is not true if shippingAddress = null
    if (Object.keys(shippingAddress).length === 0) {
        navigate("/shipping")
    }

    // set payment state
    const [payment, setPayment] = useState(paymentMethod)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(payment))
        navigate("/placeorder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Form.Check
                        className="mt-2"
                        type="radio"
                        label="PayPal"
                        id='PayPal'
                        name="paymentMethod"
                        value='PayPal'
                        checked={payment === 'PayPal'}
                        onChange={(e) => setPayment(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                        className="mt-2"
                        type="radio"
                        label="Debit Card"
                        id='Debit Card'
                        name="paymentMethod"
                        value='Debit Card'
                        checked={payment === 'Debit Card'}
                        onChange={(e) => setPayment(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                        className="mt-2"
                        type="radio"
                        label="Credit Card"
                        id='Credit Card'
                        name="paymentMethod"
                        value='Credit Card'
                        checked={payment === 'Credit Card'}
                        onChange={(e) => setPayment(e.target.value)}
                    ></Form.Check>
                </Form.Group>

                <Button className="mt-2" type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>
    )
}
