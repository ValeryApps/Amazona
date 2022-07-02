import React, { useContext, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../context/Store";

const OrderPage = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shipping_data, payment_method, cartItems },
  } = state;
  const navigate = useNavigate();
  const itemPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxPrice = 0.15 * itemPrice;
  const shippingPrice = itemPrice > 100 ? 0 : 10;

  const totalPrice = itemPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (!payment_method) navigate("/payment");
  }, [payment_method, navigate]);
  return (
    <>
      <Helmet>
        <title>Place your order</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h3 className="text-center">Place Your Order Here</h3>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Name:</strong>
                    </Col>
                    <Col>{shipping_data.fullName}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Address:</strong>
                    </Col>
                    <Col>{shipping_data.address}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>City:</strong>
                    </Col>
                    <Col>{shipping_data.city}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Country:</strong>
                    </Col>
                    <Col>{shipping_data.country}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Postal Code:</strong>
                    </Col>
                    <Col>{shipping_data.postalCode}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to="/shipping">Edit info</Link>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Payment Method</Card.Title>
              <Card.Text>
                <strong style={{ marginRight: "2rem" }}>Method:</strong>{" "}
                {payment_method}
                <br />
                <Link to="/payment">Edit</Link>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroupItem key={item._id}>
                    <Row>
                      <Col>
                        <img src={item.image} alt={item.name} width={40} />
                      </Col>
                      <Col>{item.name}</Col>
                      <Col>{item.quantity}</Col>
                      <Col>${item.price.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      <Col>${itemPrice.toFixed(2)}</Col>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      <Col>${shippingPrice.toFixed(2)}</Col>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      <Col>${taxPrice.toFixed(2)}</Col>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Order Total</strong>{" "}
                    </Col>
                    <Col>
                      <Col>
                        <strong>${totalPrice.toFixed(2)}</strong>
                      </Col>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      variant="warning"
                      type="button"
                      disabled={cartItems.length === 0}
                    >
                      Place Order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
