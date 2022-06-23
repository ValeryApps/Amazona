import { useEffect } from 'react';
import axios from 'axios'
import { useReducer } from 'react';
import ProductCard from '../components/ProductCard';
import { FAIL, FETCH, products_initialState, product_reducer, SUCCESS } from '../store/productReducer';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import AppLoader from '../components/AppLoader';



const HomeScreen = () => {
    const [{ products, error, loading }, dispatch] = useReducer(product_reducer, products_initialState);


    useEffect(() => {
        dispatch({ type: FETCH });
        axios.get("http://localhost:5000/api/products").then(response => {
            dispatch({ type: SUCCESS, payload: response.data.products })
        }).catch(error => {
            dispatch({ type: FAIL, payload: error.message })
        });
    }, []);

    if (loading) return <AppLoader message="Products Loading ..." />

    if (error) return <h2>There was an error</h2>
    return (
        < >
            <main>
                <Helmet>
                    <title>
                        Amazona
                    </title>
                </Helmet>
                <h2>Feature Products</h2>
                <Row>
                    {products?.map(product => (
                        <Col sm={6} md={4} lg={3} xs={12} key={product.slug}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </main>
        </>
    )
}

export default HomeScreen