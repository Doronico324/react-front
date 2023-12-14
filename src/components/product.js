import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';
import '../App.css';

function Product({ product }) {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      try {
        const decodedToken = jwtDecode(storedToken);
        setDecodedToken(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleAddToCart = async (productId, userId) => {
    try {
      const authToken = localStorage.getItem('token');

      const response = await fetch('https://django-framework-store.onrender.com/cart_items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ product: productId, user: userId }),
      });

      if (response.ok) {
        alert('Product has been added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Error adding product to cart');
    }
  };

  return (
    <div className="col-md-4 mb-4">
      <Card className="h-100">
        <img
          className="card-img-top circular-image"
          src={`https://django-framework-store.onrender.com${product.image}`}
          alt={`Product ${product.name}`}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</Card.Text>
          <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>
          <Card.Text><strong>Description:</strong>{product.description}</Card.Text>
          {token && (
            <Button variant="primary" style={{ backgroundColor: 'black',borderColor: 'grey' }} onClick={() => handleAddToCart(product.id, decodedToken?.user_id)}>
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;

