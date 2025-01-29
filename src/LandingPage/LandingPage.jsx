import React from 'react';
import Carousel from './Carousel';
import Login from './Login';

const LandingPage = () => {
    return (
        <div className="flex items-center">
          <Login/>
          <Carousel/>
        </div>
      );
};

export default LandingPage;
