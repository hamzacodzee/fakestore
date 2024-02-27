import React, { useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const AxiosPrac = () => {
  //   axios.interceptors.request.use((request) => {
  //     console.log("request", request);
  //     return request;
  //   });

  useEffect(() => {
    axios.interceptors.response.use((response) => {
      console.log("response", response.data);
      const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(response.data),
        "secret key 123"
      ).toString();
      return ciphertext;
    });

    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(function (response) {
        console.log("API Response: ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>AxiosPrac</h1>
    </div>
  );
};

export default AxiosPrac;
