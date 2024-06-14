import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from "../axios/axios";
import  {useNavigate,useLocation,Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for toast notifications
import './CheckoutForm.css';
import { useDispatch,useSelector } from 'react-redux';
import { auth, notify } from '../Redux/login/action';
import { authLoading } from '../Redux/login/action';
import { CircularProgress } from '@mui/material';
axios.defaults.withCredentials = true;

const CheckoutForm = () => {
  const location = useLocation();
  // console.log(location.state)
  const amount = (location.state?.data || 0).toFixed(2) * 100;
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the state after assigning the amount
    if (location.state?.data) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);  
  const { user, loading, error ,success} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });
  

  useEffect(() => {
    console.log(amount)

    axios.post('http://localhost:5000/api/v1/stripe/create-payment-intent', { amount }) // Amount in cents
      .then((response) => {
        setClientSecret(response.data.data.paymentIntent);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          dispatch(auth(null))
          navigate('/join/login-popup', { replace: true })   
          toast.error('User not authenticated. The token sent is expired.');
        }
        console.error('Error creating payment intent:', error)});
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: billingDetails,
      },
    });
    

    if (result.error) {
      dispatch(authLoading(false));
      console.error(result.error.message);
        toast.error(result.error.message);
    } else {
      dispatch(authLoading(false));
      console.log(result.paymentIntent);
      setBillingDetails({
        name: '',
        email: '',
        address: {
          line1: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'US'
        }
      })
        toast.success('Payment successful');
      // Handle the successful payment here (e.g., display a confirmation message, send to your server, etc.)
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const nameParts = name.split('.');

    if (nameParts.length > 1) {
      setBillingDetails((prevDetails) => ({
        ...prevDetails,
        [nameParts[0]]: {
          ...prevDetails[nameParts[0]],
          [nameParts[1]]: value,
        },
      }));
    } else {
      setBillingDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Stripe Checkout</h2>
      <div className="billing-details">
        <label>
          Name
          <input type="text" name="name" value={billingDetails.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={billingDetails.email} onChange={handleChange} required />
        </label>
        <label>
          Address
          <input type="text" name="address.line1" value={billingDetails.address.line1} onChange={handleChange} required />
        </label>
        <label>
          City
          <input type="text" name="address.city" value={billingDetails.address.city} onChange={handleChange} required />
        </label>
        <label>
          State
          <input type="text" name="address.state" value={billingDetails.address.state} onChange={handleChange} required />
        </label>
        <label>
          Postal Code
          <input type="text" name="address.postal_code" value={billingDetails.address.postal_code} onChange={handleChange} required />
        </label>
        <label>
          Country
          <input type="text" name="address.country" value={billingDetails.address.country} onChange={handleChange} required />
        </label>
      </div>
      <div className="card-element">
        <label>Card Number</label>
        <CardNumberElement />
      </div>
      <div className="card-element">
        <label>Expiration Date</label>
        <CardExpiryElement />
      </div>
      <div className="card-element">
        <label>CVC</label>
        <CardCvcElement />
      </div>
      {/* <div className="card-element">
        <label>Postal Code</label>
        <PostalCodeElement />
      </div> */}
      <button type="submit" className="submit-button" disabled={!stripe} onClick={() => {
              dispatch(authLoading(true));

              
            }}>
                          {loading ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Pay"
            )}
        
      </button>
    </form>
    </>

  );
};

export default CheckoutForm;
