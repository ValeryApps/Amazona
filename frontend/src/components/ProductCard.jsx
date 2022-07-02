import axios from 'axios'
import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CART_ADD_ITEMS, Store } from '../context/Store'
import Rating from './Rating'
const ProductCard = ({ product }) => {
    const { state, dispatch:ctxDispatch} = useContext(Store);
    const {
      cart: { cartItems },
    } = state;
    const addToCartHandler = async (item)=>{
        const existingItem= cartItems.find(x=>x._id===item._id)
        const quantity = existingItem ? existingItem.quantity +1:1;
        const {data} = await axios.get(`http://localhost:5000/api/products/${item._id}`)
        if(data.countInStock < quantity){
            window.alert('Sorry! Product is out of stock')
            return;
        }
          ctxDispatch({type:CART_ADD_ITEMS, payload:{...item, quantity}})
          
        }
    return (
        <Card className='mb-3' >
            <Link to={`/products/slug/${product.slug}`}>
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
                {product.countInStock === 0 ? <Button variant='light' disabled >Out of Stock</Button>:<Button onClick={()=>addToCartHandler(product)} variant="warning" >Add To Cart</Button>}
                
            </Card.Footer>
        </Card>
    )
}

export default ProductCard