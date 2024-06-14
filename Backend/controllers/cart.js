import express from 'express';
import Cart from '../models/cart';

const getCart = async (req, res,next) => {
    try {
      const cart = await Cart.findOne({ userId: req.body.userId }).populate('products.productId');
      if (!cart) {
        throw new Error('Cart not found')
      }
      res.status(200).json(cart.products);
    } catch (err) {
      next(err)
    }
  }

  const createCart = async (req, res,next) => {
    const { productId, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ userId: req.body.userId });
  
      if (!cart) {
        cart = new Cart({ userId: req.params.userId, products: [] });
      }
  
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
  
      await cart.save();
      res.status(201).json(cart.products);
    } catch (err) {
      next(err)
    }
  }
  const updateCart = async(req,res,next) =>{
    try{
        const cart = await Cart.findOne({userId: req.body.userId})
        if (!cart){
            throw new Error("Cart not found")
        }
        const productIndex = cart.products.findIndex(p => p.productId.toString() === req.params.productId);
        if (productIndex < 0){
            throw new Error("Product not found")
        }
        cart.products[productIndex].quantity = req.body.quantity;
        await cart.save();
        res.status(200).json(cart.products);
    }
    catch(err){
        next(err)
    }
  }
  
  const deleteCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.body.userId });
  
      if (!cart) {
        throw new Error("Cart Not Found")
      }
  
      cart.products = cart.products.filter(product => product.productId.toString() !== req.params.productId);
      await cart.save();
      res.status(204).json(cart.products);
    } catch (err) {
      next(err)
    }
  }
  