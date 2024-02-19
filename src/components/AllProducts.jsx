import React from "react";
import { fetchData } from "../store/slice/FakeStoreSlice";
import { useDispatch } from "react-redux";

const AllProducts = () => {
  const dispatch = useDispatch();
  const response = dispatch(fetchData());
  console.log(response);
  return <div>All Products</div>;
};

export default AllProducts;
