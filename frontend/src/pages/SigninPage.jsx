import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { SIGNIN_USER, Store } from "../context/Store";


const SigninPage = () => {
   const {search} = useLocation()
   const redirecturl = new URLSearchParams(search).get('redirect')
   const redirect = redirecturl||'/'
   const navigate = useNavigate();
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const {dispatch:ctxDispatch, state} = useContext(Store);
     const {user_info} = state;
   const handleSignin =async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:5000/api/users/signin', {
        email, password
      })
      
      ctxDispatch({
        type:SIGNIN_USER, payload:data
       })
        
    localStorage.setItem('user', JSON.stringify(data));
    navigate(redirect||'/');
    } catch (error) {
      console.log(error);
      alert(error.message)
    }
  
   } 
  
   useEffect(()=>{
     if(user_info)
      navigate(redirect)
   }, [user_info, navigate, redirect])

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Title className="text-center">Sign in</Card.Title>
              <Form onSubmit={handleSignin}>
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} name={email} />
                  </Form.Group>{" "}
                  <Form.Group>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} name={password}/>
                  </Form.Group>{" "}
                </Card.Body>
                <Card.Footer>
                  <div className="my-3">
                    <Button type="submit">Submit</Button>
                  </div>
                  <div className="mb-3">
                     New Comer {' '}
                     <Link to={`/register?redirect=${redirect}`}>Create an account</Link>
                  </div>
                </Card.Footer>
              </Form>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
  );
};

export default SigninPage;
