import { useContext } from "react";
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
import { MessageBox } from "../components/MessageBox";
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS, Store } from "../context/Store";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import axios from "axios";

export const CartScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();
  const updateItemHandler = async (item, quantity) => {
    const { data } = await axios.get(
      `http://localhost:5000/api/products/${item._id}`
    );

    if (data.countInStock < quantity) {
      window.alert("Sorry! Product is out of stock");
      return;
    }
    ctxDispatch({ type: CART_ADD_ITEMS, payload: { ...item, quantity } });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: CART_REMOVE_ITEMS, payload: item });
  };
  const goToCheckout = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox message="The cart is empty">
              <Link to="/">Go back to products</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroupItem key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <Link to={`/products/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="light"
                          disabled={item.quantity === 1}
                          onClick={() =>
                            updateItemHandler(item, item.quantity - 1)
                          }
                        >
                          <FaMinusCircle />
                        </Button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateItemHandler(item, item.quantity + 1)
                          }
                        >
                          <FaPlusCircle />
                        </Button>
                      </Col>
                      <Col md={3}>${item.price.toFixed(2)}</Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          onClick={() => removeItemHandler(item)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    SubTotal: (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items) $
                    {cartItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </h4>
                </ListGroup.Item>
                {cartItems.length > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        variant="warning"
                        onClick={goToCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
