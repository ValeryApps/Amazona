import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { SAVE_PAYMENT_METHOD, Store } from "../context/Store";

const PaymentMethodScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shipping_data },
  } = state;
  const initial = JSON.parse(localStorage.getItem("payment"));
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(initial || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });
    localStorage.setItem("payment", JSON.stringify(paymentMethod));
    navigate("/orders");
  };

  useEffect(() => {
    if (shipping_data === {}) {
      navigate("/shipping");
    }
  }, [shipping_data, navigate]);

  return (
    <>
      <Helmet>
        <title>Payment Methods</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <h3>Payment Methods</h3>
      <Row>
        <Col md={3}></Col>
        <Col md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Check
              value="paypal"
              type="radio"
              label="Paypal"
              id="paypal"
              checked={paymentMethod === "paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              value="strip"
              type="radio"
              label="Strip"
              id="strip"
              checked={paymentMethod === "strip"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  );
};

export default PaymentMethodScreen;
