import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useReducer } from 'react';
import { FETCH_FAIL, FETCH_PRODUCT, FETCH_SUCCESS, product_details_initialState, product_details_reducer } from '../store/productDetailsReducer';
import { Col, Row, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import AppLoader from '../components/AppLoader';



const ProductDetail = () => {
    const [{ loading, product, error }, dispatch] = useReducer(product_details_reducer, product_details_initialState)
    const { slug } = useParams();

    useEffect(() => {
        dispatch({ type: FETCH_PRODUCT });
        axios.get(`http://localhost:5000/api/products/${slug}`).then(response => dispatch({ type: FETCH_SUCCESS, payload: response.data })).catch(err => dispatch({ type: FETCH_FAIL, payload: err.message }));
    }, [slug])

    if (loading) return <AppLoader message="Product Loading ..." />
    if (error) return <h2>Sorry, There was an error</h2>
    return (
        <>
            {product &&
                <Row style={{ marginTop: '60px' }}>
                    <Col md={6}>
                        <img src={product.image} alt={product.name} />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Helmet>
                                    <title>
                                        {product.name}
                                    </title>
                                </Helmet>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating rating={product.rating} numReviews={product.numReviews} />
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: <strong> ${product.price}</strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong> ${product.price}</strong></Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ?
                                            <Badge bg='success'>In Stock</Badge> : <Badge bg='danger'>Unvailable</Badge>
                                        }
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {product.countInStock > 0 &&
                                    <div className='d-grid'>
                                        <Button variant='warning' >Add To Cart</Button>
                                    </div>}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            }

        </>
    )
}

export default ProductDetail