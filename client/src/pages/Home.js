import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data';

function Home() {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '30px',
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}>منتجاتنا</h1>
      <div style={containerStyle}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            isOffer={product.isOffer}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;