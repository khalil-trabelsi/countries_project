import React from "react";
import Countries from "./Countries";
import Logo from "./Logo";
import Navigation from "./Navigation";
const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <Logo />
      <Countries />
    </div>
  );
};
export default Home;
