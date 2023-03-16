import React from "react";
import Jumbotron from "../components/cards/Jumbotron.js";
import NewArrivals from "../components/home/NewArrivals.js";
import BestSellers from "../components/home/BestSellers.js";
import CategoryList from "../components/category/CategoryList.js";
import SubList from "../components/sub/SubList.js";
const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "New", "Best Sellers"]} />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Category list
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        sub list
      </h4>
      <SubList />
      <br />
      <br />
    </>
  );
};

export default Home;