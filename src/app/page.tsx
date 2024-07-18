import './globals.css'; // Adjust the path based on your actual directory structure
import React from "react";
import Roadmap from './Components/Roadmap';
const Home = () => {
  const ok = 1
  return <div>
    <Roadmap activeStep={ok} />
    </div>;
};

export default Home;
