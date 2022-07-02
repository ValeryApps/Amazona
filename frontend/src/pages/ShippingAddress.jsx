import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { SAVE_SHIPPING_ADDRESS, Store } from "../context/Store";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddress = () => {
   const {state, dispatch:ctxDispatch} = useContext(Store);
   const {cart: {shipping_data}, user_info} = state;
  const [fullName, setFullname] = useState(shipping_data.fullName||"");
  const [address, setAddress] = useState(shipping_data.address||"");
  const [city, setCity] = useState(shipping_data.city||"");
  const [postalCode, setPostalCode] = useState(shipping_data.postalCode||"");
  const [country, setCountry] = useState(shipping_data.country||"");

  const navigate = useNavigate();
  const shippingData = {
   fullName,
   address,
   city,
   postalCode,
   country
}
  const handleSubmitting = (e) => {
    e.preventDefault();
    ctxDispatch({
      type:SAVE_SHIPPING_ADDRESS,
      payload:shippingData
    })
    localStorage.setItem('shipping', JSON.stringify(shippingData));
    navigate('/payment')
  };

useEffect(()=>{
   if(!user_info){
      navigate('/login?redirect=shipping')
   }
},[user_info, navigate])

  return (
    <>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2/>
      <h1 className="my-3 text-center">Shipping Address</h1>
      <Row>
         <Col md={3}></Col>
         <Col md={6}>
         <Form onSubmit={handleSubmitting}>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group> 
        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          </Form.Group>
          <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <div className="my-3">
         <Button variant="primary" type='submit'>
            Continue
         </Button>
        </div>
      </Form>
         </Col>
         <Col md={3}></Col>
      </Row>
      
    </>
  );
};

export default ShippingAddress;
