import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const ProductCard = ({ product }) => {
    return (
        <Card className='mb-3' >
            <Link to={`/products/${product.slug}`}>
                <img src={product.image} className='card-img-top' alt={product.name} />
            </Link>
            <Card.Body className="product-info">
                <Card.Title>
                    <Link to={`/products/${product.slug}`}>
                        {product.name}
                    </Link>
                </Card.Title>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>
                    Price: <strong>${product.price}</strong>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="warning" >Add To Cart</Button>
            </Card.Footer>
        </Card>
    )
}

export default ProductCard