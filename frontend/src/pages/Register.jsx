import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SIGNIN_USER, Store } from '../context/Store';
import {toast} from 'react-toastify'

const Register = () => {
  const {search} = useLocation()
  const redirecturl = new URLSearchParams(search).get('redirect')
  const redirect = redirecturl||'/'
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const {dispatch:ctxDispatch, state} = useContext(Store);
    const {user_info} = state;
  const handleSignin =async (e)=>{
   e.preventDefault();
   try {
    if(password !== confirmPassword){
      toast.error("Passwor and confirm password don't match");
      return
    }
     const {data} = await axios.post('http://localhost:5000/api/users/register', {
       email, password, name
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
                   <Form.Label>Name </Form.Label>
                   <Form.Control type="text" required onChange={(e)=>setName(e.target.value)} name={name} />
                 </Form.Group>{" "}
            
                 <Form.Group>
                   <Form.Label>Email </Form.Label>
                   <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} name={email} />
                 </Form.Group>{" "}
                 <Form.Group>
                   <Form.Label>Password </Form.Label>
                   <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} name={password}/>
                 </Form.Group>{" "}
                 <Form.Group>
                   <Form.Label>Confirm Password </Form.Label>
                   <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} name={confirmPassword}/>
                 </Form.Group>{" "}
               </Card.Body>
               <Card.Footer>
                 <div className="my-3">
                   <Button type="submit">Submit</Button>
                 </div>
                 <div className="mb-3">
                    Alread have an accoung {' '}
                    <Link to={`/signin?redirect=${redirect}`}>Login</Link>
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


export default Register