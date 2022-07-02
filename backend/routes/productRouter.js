import express from 'express'
import { Product } from '../models/product.js';

export const productRouter = express.Router();

productRouter.get('/', async(req,res)=>{
  try {
   const products = await Product.find();
   return res.send({products})
  } catch (error) {
   console.log(error.message);
  }
})
productRouter.get('/slug/:slug', async (req,res)=>{
  try {
   const product = await Product.findOne({slug:req.params.slug})
   if(product)
    return res.send(product)
   else
      return res.status(404).send({message:'Not Found'})
  } catch (error) {
   console.log(error.message);
  }
})
productRouter.get('/:id', async (req,res)=>{
  try {
   const product = await Product.findById(req.params.id)
   if(product)
    return res.send(product)
   else
      return res.status(404).send({message:'Not Found'})
  } catch (error) {
   console.log(error.message);
  }
})
