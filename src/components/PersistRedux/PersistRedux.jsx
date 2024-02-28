import React from "react";
import { setNum } from "../../store/slice/PersistPracSlice";
import { useDispatch, useSelector } from "react-redux";

const PersistRedux = () => {
  const dispatch = useDispatch();
  const { num } = useSelector((state) => state.persistPrac);

  const handleIncrement = () => {
    dispatch(setNum(num + 1));
  };

  const handleDecrement = () => {
    dispatch(setNum(num - 1));
  };

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <input type="text" name="number" id="number" value={num} readOnly />
      <button onClick={handleIncrement}>+</button>
    </div>
  );
};

export default PersistRedux;
