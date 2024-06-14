// App.js or similar entry file
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkOutForm'; // Your checkout form component

// Your Stripe public key
const stripePromise = loadStripe("pk_test_51PO1gtP3O3GMk0X3di9dwd6jKbPRpAarkaVgwneWUofKXMjxf9vlIizg4tR5hlq3uXbAIEfP63ZjHVzpVUm1lyrq00obvMKld4");

const StripeProvider = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeProvider;
