import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="text-center">
        <h1>Welcome to One Stop Shop Online!</h1>
        <p className="mb-4">Explore our collection of products.</p>
        <p>
          your ultimate destination for cutting-edge electronics and innovative tech gadgets! Here, we are dedicated to bringing you the latest advancements in the world of electronics, providing an unparalleled shopping experience to meet all your tech needs.</p>
        <p>Step into a realm of innovation as you explore our carefully curated selection of top-tier electronics. From state-of-the-art smartphones and powerful laptops to smart home devices and cutting-edge audiovisual solutions, we have assembled a collection where quality is paramount.
           Every product on our shelves is meticulously chosen for its performance, reliability, and technological excellence.</p>
        <p>Whether you're a dedicated tech enthusiast, a professional in search of the latest tools, or someone looking to elevate their everyday gadgets, we got you covered. Our knowledgeable and friendly staff are at your service, ready to guide you through our extensive range and provide expert advice to ensure you make informed decisions.</p>
        <p>Embrace the future with confidence as you peruse our diverse collection of electronics, all backed by our unwavering commitment to customer satisfaction.
           we go beyond merely selling gadgets; we deliver experiences that enhance your digital lifestyle.</p>
        <Link to="/react-store" className="btn btn-primary">
          View Store
        </Link>
      </div>
    </div>
  );
}

export default Home;
